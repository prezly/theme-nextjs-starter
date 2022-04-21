import {
    getNewsroomServerSideProps,
    getPrezlyApi,
    processRequest,
    useCurrentStory,
} from '@prezly/theme-kit-nextjs';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import { importMessages } from '@/utils';
import type { BasePageProps } from 'types';

const Story = dynamic(() => import('@/modules/Story'), { ssr: true });

function StoryPreviewPage() {
    const currentStory = useCurrentStory();

    if (!currentStory) {
        return null;
    }

    return <Story story={currentStory} />;
}

export const getServerSideProps: GetServerSideProps<BasePageProps> = async (context) => {
    const api = getPrezlyApi(context.req);
    const { uuid } = context.params as { uuid: string };
    const story = await api.getStory(uuid);
    if (!story) {
        return { notFound: true };
    }

    const { serverSideProps } = await getNewsroomServerSideProps(context, { story });

    return processRequest(context, {
        ...serverSideProps,
        newsroomContextProps: {
            ...serverSideProps.newsroomContextProps,
            currentStory: story,
            embedStories: await api.getEmbedStories(story),
        },
        isTrackingEnabled: false,
        translations: await importMessages(serverSideProps.newsroomContextProps.localeCode),
    });
};

export default StoryPreviewPage;
