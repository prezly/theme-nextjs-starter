import type { Story } from '@prezly/sdk';
import { useCurrentCategory } from '@prezly/theme-kit-nextjs';
import React from 'react';

import { Layout } from '@/modules/Layout';
import type { PaginationProps } from 'types';

// import { InfiniteStories } from '../InfiniteStories';
import { PaginatedStories } from '../PaginatedStories';

interface Props {
    pagination: PaginationProps;
    stories: Story[];
}

export function Category({ pagination, stories }: Props) {
    const currentCategory = useCurrentCategory();
    if (!currentCategory) {
        return null;
    }

    return (
        <Layout>
            <h1>{currentCategory.display_name}</h1>
            <p>{currentCategory.display_description}</p>

            {/* You can switch to infinite loading by uncommenting the `InfiniteStories` component below
            and removing the `PaginatedStories` component. */}
            <PaginatedStories stories={stories} pagination={pagination} />
            {/* <InfiniteStories
                initialStories={stories}
                pagination={pagination}
                category={currentCategory}
            /> */}
        </Layout>
    );
}
