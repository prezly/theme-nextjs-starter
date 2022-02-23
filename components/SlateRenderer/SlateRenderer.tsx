import { Renderer } from '@prezly/content-renderer-react-js';
import type { Node } from '@prezly/slate-types';
import '@prezly/content-renderer-react-js/styles.css';

interface Props {
    nodes: Node | Node[];
}

export function SlateRenderer({ nodes }: Props) {
    return (
        <div>
            <Renderer nodes={nodes} />
        </div>
    );
}
