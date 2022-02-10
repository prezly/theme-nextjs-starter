import { Renderer } from '@prezly/content-renderer-react-js';
import type { Node } from '@prezly/slate-types';
import { isTextNode } from '@prezly/slate-types';
import { useMemo } from 'react';
import '@prezly/content-renderer-react-js/styles.css';

import type { HtmlNode } from './Html';
import { Html } from './Html';

interface Props {
    nodes: Node | Node[];
}

export function SlateRenderer({ nodes }: Props) {
    // TODO: Remove this when content-renderer-react-js adds support for html nodes
    const htmlNodes = useMemo(() => {
        if (Array.isArray(nodes) || isTextNode(nodes)) {
            return [];
        }

        return nodes.children.filter((child: any) => !isTextNode(child) && child.type === 'html');
    }, [nodes]);

    return (
        <div>
            {/* TODO: Remove this when content-renderer-react-js adds support for html nodes. @see MT-4553 */}
            {htmlNodes.map((node: any, index: number) => (
                // eslint-disable-next-line react/no-array-index-key
                <Html node={node as HtmlNode} key={index} />
            ))}
            <Renderer nodes={nodes} />
        </div>
    );
}
