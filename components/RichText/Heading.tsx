import type { HeadingNode } from '@prezly/slate-types';
import { HEADING_1_NODE_TYPE } from '@prezly/slate-types';
import type { ReactNode } from 'react';

interface Props {
    node: HeadingNode;
    children?: ReactNode;
}

export function Heading({ node, children }: Props) {
    if (node.type === HEADING_1_NODE_TYPE) {
        return <h2>{children}</h2>;
    }

    return <h3>{children}</h3>;
}
