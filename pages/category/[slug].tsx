import type { Story } from '@prezly/sdk';
import {
    getCategoryPageServerSideProps,
    type PaginationProps,
    useCurrentCategory,
} from '@prezly/theme-kit-nextjs';
import dynamic from 'next/dynamic';
import type { FunctionComponent } from 'react';

import { importMessages } from '@/utils';
import type { BasePageProps } from 'types';

const Category = dynamic(() => import('@/modules/Category'));

interface Props extends BasePageProps {
    stories: Story[];
    pagination: PaginationProps;
}

const CategoryPage: FunctionComponent<Props> = ({ stories, pagination }) => {
    const currentCategory = useCurrentCategory();

    return <Category category={currentCategory!} stories={stories} pagination={pagination} />;
};

export const getServerSideProps = getCategoryPageServerSideProps<BasePageProps, Story>(
    async (_, { newsroomContextProps }) => ({
        translations: await importMessages(newsroomContextProps.localeCode),
    }),
);

export default CategoryPage;
