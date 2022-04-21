import type { ExtendedStory } from '@prezly/sdk';
import { isStoryBookmarkNode } from '@prezly/slate-types';
import {
    DUMMY_DEFAULT_LOCALE,
    getNewsroomServerSideProps,
    getPrezlyApi,
    processRequest,
    useCurrentStory,
} from '@prezly/theme-kit-nextjs';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import { importMessages } from '@/utils';

const Story = dynamic(() => import('@/modules/Story'), { ssr: true });

function StoryPage() {
    const currentStory = useCurrentStory();

    if (!currentStory) {
        return null;
    }

    return <Story story={currentStory} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const api = getPrezlyApi(context.req);

    const { slug } = context.params as { slug?: string };
    const story = slug ? await api.getStoryBySlug(slug) : null;

    if (!story) {
        return { notFound: true };
    }

    // We are passing the story object to detect locale from the story itself
    // since the locale code is not part of the URL (e.g. /my-story).
    const { serverSideProps } = await getNewsroomServerSideProps(context, { story });

    const { locale } = context;
    if (locale && locale !== DUMMY_DEFAULT_LOCALE) {
        return {
            redirect: {
                destination: `/${slug}`,
                permanent: true,
            },
        };
    }

    const nodes = JSON.parse(story.content);

    const loadedStories: Array<ExtendedStory | undefined> = await Promise.all(
        nodes.children.map((c) =>
            isStoryBookmarkNode(c) ? api.getStory(c.story.uuid) : undefined,
        ),
    );

    const storiesHash: Record<string, ExtendedStory> = {};

    loadedStories.forEach((s) => {
        if (s !== undefined) {
            storiesHash[s.uuid] = s;
        }
    });

    return processRequest(context, {
        ...serverSideProps,
        newsroomContextProps: {
            ...serverSideProps.newsroomContextProps,
            currentStory: { ...story, storiesHash },
        },
        translations: await importMessages(serverSideProps.newsroomContextProps.localeCode),
    });
};

export default StoryPage;
