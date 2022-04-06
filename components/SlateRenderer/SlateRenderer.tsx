import type { ComponentRenderers } from '@prezly/content-renderer-react-js';
import { Renderer } from '@prezly/content-renderer-react-js';
import type { Node } from '@prezly/slate-types';
import { PLACEHOLDER_NODE_TYPE } from '@prezly/slate-types';
import '@prezly/content-renderer-react-js/styles.css';

import { Placeholder } from './components';

interface Props {
    nodes: Node | Node[];
}

const components: ComponentRenderers = {
    [PLACEHOLDER_NODE_TYPE]: Placeholder,
};

export function SlateRenderer({ nodes }: Props) {
    return (
        <div>
            <Renderer nodes={nodes} components={components} />
        </div>
    );
}
