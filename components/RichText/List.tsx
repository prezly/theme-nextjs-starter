import type { ListNode } from '@prezly/slate-types';
import { NUMBERED_LIST_NODE_TYPE } from '@prezly/slate-types';
import type { PropsWithChildren } from 'react';

interface Props {
    node: ListNode;
}

export function List({ node, children }: PropsWithChildren<Props>) {
    if (node.type === NUMBERED_LIST_NODE_TYPE) {
        return <ol>{children}</ol>;
    }

    return <ul>{children}</ul>;
}

export function ListItem({ children }: PropsWithChildren<{}>) {
    return <li>{children}</li>;
}

export function ListItemText({ children }: PropsWithChildren<{}>) {
    return <>{children}</>;
}
