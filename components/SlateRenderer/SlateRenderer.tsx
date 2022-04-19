import { Component, Renderer } from '@prezly/content-renderer-react-js';
import type { Node } from '@prezly/slate-types';
import { isPlaceholderNode } from '@prezly/slate-types';
import '@prezly/content-renderer-react-js/styles.css';

import { Placeholder } from './components';

interface Props {
    nodes: Node | Node[];
}

export function SlateRenderer({ nodes }: Props) {
    return (
        <div>
            <Renderer nodes={nodes}>
                <Component match={isPlaceholderNode} component={Placeholder} />
            </Renderer>
        </div>
    );
}
