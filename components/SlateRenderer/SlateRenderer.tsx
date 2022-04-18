import type { ComponentRenderers } from '@prezly/content-renderer-react-js';
import { Renderer } from '@prezly/content-renderer-react-js';
import type { Node } from '@prezly/slate-types';
import { GALLERY_NODE_TYPE, IMAGE_NODE_TYPE, PLACEHOLDER_NODE_TYPE } from '@prezly/slate-types';

import '@prezly/content-renderer-react-js/styles.css';
import { Gallery, Image, Placeholder } from '@/components/SlateRenderer/components';

interface Props {
    nodes: Node | Node[];
}

const components: ComponentRenderers = {
    [PLACEHOLDER_NODE_TYPE]: Placeholder,
    [GALLERY_NODE_TYPE]: Gallery,
    [IMAGE_NODE_TYPE]: Image,
};

export function SlateRenderer({ nodes }: Props) {
    return (
        <div>
            <Renderer nodes={nodes} components={components} />
        </div>
    );
}
