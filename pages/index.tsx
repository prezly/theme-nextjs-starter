import type { Story } from '@prezly/sdk';
import {
    DEFAULT_PAGE_SIZE,
    getNewsroomServerSideProps,
    processRequest,
} from '@prezly/theme-kit-nextjs';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import { importMessages, isTrackingEnabled } from '@/utils';
import type { BasePageProps, PaginationProps } from 'types';

interface Props extends BasePageProps {
    stories: Story[];
    pagination: PaginationProps;
}

const Stories = dynamic(() => import('@/modules/Stories'), { ssr: true });

function IndexPage({ stories, pagination }: Props) {
    return <Stories stories={stories} pagination={pagination} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { api, serverSideProps } = await getNewsroomServerSideProps(context);

    const page =
        context.query.page && typeof context.query.page === 'string'
            ? Number(context.query.page)
            : undefined;

    const { localeCode } = serverSideProps.newsroomContextProps;
    const { stories, storiesTotal } = await api.getStories({
        page,
        localeCode,
    });

    return processRequest(
        context,
        {
            ...serverSideProps,
            stories,
            pagination: {
                itemsTotal: storiesTotal,
                currentPage: page ?? 1,
                pageSize: DEFAULT_PAGE_SIZE,
            },
            isTrackingEnabled: isTrackingEnabled(context),
            translations: await importMessages(localeCode),
        },
        '/',
    );
};

export default IndexPage;
