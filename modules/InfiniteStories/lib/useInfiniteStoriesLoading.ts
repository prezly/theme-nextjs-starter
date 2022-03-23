import type { Category, Story } from '@prezly/sdk';
import type { LocaleObject } from '@prezly/theme-kit-nextjs';
import { useCurrentLocale } from '@prezly/theme-kit-nextjs';
import { useEffect } from 'react';

import { useInfiniteLoading } from '@/hooks';
import type { PaginationProps } from 'types';

async function fetchStories(
    page: number,
    pageSize: number,
    category?: Category,
    locale?: LocaleObject,
): Promise<{ stories: Story[] }> {
    const result = await fetch('/api/fetch-stories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            page,
            pageSize,
            category,
            include: ['thumbnail_image'],
            ...(locale && {
                localeCode: locale.toUnderscoreCode(),
            }),
        }),
    });

    if (!result.ok) {
        const { message } = await result.json();
        throw new Error(message);
    }

    return result.json();
}

export function useInfiniteStoriesLoading(
    initialStories: Story[],
    pagination: PaginationProps,
    category?: Category,
) {
    const currentLocale = useCurrentLocale();

    const { canLoadMore, data, isLoading, loadMore, resetData } = useInfiniteLoading<Story>({
        fetchingFn: async (nextPage: number, pageSize) => {
            const { stories } = await fetchStories(nextPage, pageSize, category, currentLocale);
            return stories;
        },
        initialData: initialStories,
        pagination,
    });

    useEffect(() => {
        if (category?.id) {
            resetData();
        }
    }, [category?.id, resetData]);

    return {
        canLoadMore,
        isLoading,
        loadMoreStories: loadMore,
        stories: data,
    };
}
