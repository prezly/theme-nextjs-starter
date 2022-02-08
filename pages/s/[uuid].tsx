import {
    getNewsroomServerSideProps,
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
    try {
        const { api, serverSideProps } = await getNewsroomServerSideProps(context);
        const { uuid } = context.params as { uuid: string };
        const story = await api.getStory(uuid);

        return processRequest(context, {
            ...serverSideProps,
            newsroomContextProps: {
                ...serverSideProps.newsroomContextProps,
                currentStory: story,
            },
            translations: await importMessages(serverSideProps.newsroomContextProps.localeCode),
        });
    } catch (error) {
        // Log the error into NextJS console
        // eslint-disable-next-line no-console
        console.error(error);

        return {
            notFound: true,
        };
    }
};

export default StoryPreviewPage;
