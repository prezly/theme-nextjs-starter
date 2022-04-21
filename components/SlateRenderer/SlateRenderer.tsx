import { Component, Renderer } from '@prezly/content-renderer-react-js';
import type { Node } from '@prezly/slate-types';
import { isPlaceholderNode, isStoryBookmarkNode } from '@prezly/slate-types';
import '@prezly/content-renderer-react-js/styles.css';

import { Placeholder, StoryBookmark } from './components';

interface Props {
    nodes: Node | Node[];
}

export function SlateRenderer({ nodes }: Props) {
    return (
        <div>
            <Renderer nodes={nodes} defaultComponents>
                <Component match={isPlaceholderNode} component={Placeholder} />
                <Component match={isStoryBookmarkNode} component={StoryBookmark} />
            </Renderer>
        </div>
    );
}
