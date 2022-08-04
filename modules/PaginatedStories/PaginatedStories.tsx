import type { Story } from '@prezly/sdk';
import type { PaginationProps } from '@prezly/theme-kit-nextjs';

import { Pagination } from '@/components';

import { StoriesList } from '../StoriesList/StoriesList';

interface Props {
    stories: Story[];
    pagination: PaginationProps;
}

export function PaginatedStories({ stories, pagination }: Props) {
    return (
        <>
            <StoriesList stories={stories} />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Pagination {...pagination} />
        </>
    );
}
