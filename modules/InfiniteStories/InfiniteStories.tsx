import type { Category, Story } from '@prezly/sdk';

import type { PaginationProps } from 'types';

import { StoriesList } from '../StoriesList';

import { useInfiniteStoriesLoading } from './lib';
import { LoadMore } from './LoadMore';

interface Props {
    initialStories: Story[];
    pagination: PaginationProps;
    category?: Category;
}

export function InfiniteStories({ initialStories, pagination, category }: Props) {
    const { canLoadMore, isLoading, loadMoreStories, stories } = useInfiniteStoriesLoading(
        initialStories,
        pagination,
        category,
    );

    return (
        <>
            <StoriesList stories={stories} />
            {canLoadMore && <LoadMore isLoading={isLoading} onLoadMore={loadMoreStories} />}
        </>
    );
}
