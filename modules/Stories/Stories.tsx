import type { Story } from '@prezly/sdk';
import { type PaginationProps } from '@prezly/theme-kit-nextjs';

import { Layout } from '@/modules/Layout';

// import { InfiniteStories } from '../InfiniteStories';
import { PaginatedStories } from '../PaginatedStories';

interface Props {
    stories: Story[];
    pagination: PaginationProps;
}

export function Stories({ stories, pagination }: Props) {
    return (
        <Layout>
            <h1>Hello Prezly 👋</h1>

            {/* You can switch to infinite loading by uncommenting the `InfiniteStories` component below
            and removing the `PaginatedStories` component. */}
            <PaginatedStories stories={stories} pagination={pagination} />
            {/* <InfiniteStories initialStories={stories} pagination={pagination} /> */}
        </Layout>
    );
}
