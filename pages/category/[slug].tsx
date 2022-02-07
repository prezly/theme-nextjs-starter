import type { Story } from '@prezly/sdk';
import {
    DEFAULT_PAGE_SIZE,
    getNewsroomServerSideProps,
    processRequest,
} from '@prezly/theme-kit-nextjs';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import { importMessages } from '@/utils';
import type { BasePageProps, PaginationProps } from 'types';

interface Props extends BasePageProps {
    stories: Story[];
    pagination: PaginationProps;
}

const Category = dynamic(() => import('@/modules/Category'), { ssr: true });

function CategoryPage({ stories, pagination }: Props) {
    return <Category stories={stories} pagination={pagination} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { api, serverSideProps } = await getNewsroomServerSideProps(context);

    const { slug } = context.params as { slug: string };
    const category = await api.getCategoryBySlug(slug);

    if (!category) {
        return {
            notFound: true,
        };
    }

    const page =
        context.query.page && typeof context.query.page === 'string'
            ? Number(context.query.page)
            : undefined;

    const { localeCode } = serverSideProps.newsroomContextProps;
    const { stories, storiesTotal } = await api.getStoriesFromCategory(category, {
        page,
        localeCode,
    });

    return processRequest(
        context,
        {
            ...serverSideProps,
            newsroomContextProps: {
                ...serverSideProps.newsroomContextProps,
                currentCategory: category,
            },
            stories,
            pagination: {
                itemsTotal: storiesTotal,
                currentPage: page ?? 1,
                pageSize: DEFAULT_PAGE_SIZE,
            },
            translations: await importMessages(localeCode),
        },
        `/category/${slug}`,
    );
};

export default CategoryPage;
