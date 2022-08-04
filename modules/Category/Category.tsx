import type { Category as CategoryType, Story } from '@prezly/sdk';
import type { PaginationProps } from '@prezly/theme-kit-nextjs';

import { Layout } from '@/modules/Layout';

// import { InfiniteStories } from '../InfiniteStories';
import { PaginatedStories } from '../PaginatedStories';

interface Props {
    category: CategoryType;
    pagination: PaginationProps;
    stories: Story[];
}

export function Category({ category, pagination, stories }: Props) {
    return (
        <Layout>
            <h1>{category.display_name}</h1>
            <p>{category.display_description}</p>

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
