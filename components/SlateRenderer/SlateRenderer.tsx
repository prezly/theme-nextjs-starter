import { Component, Renderer } from '@prezly/content-renderer-react-js';
import type { Node } from '@prezly/story-content-format';
import { PlaceholderNode, StoryBookmarkNode } from '@prezly/story-content-format';
import '@prezly/content-renderer-react-js/styles.css';

import { Placeholder, StoryBookmark } from './components';

interface Props {
    nodes: Node | Node[];
}

export function SlateRenderer({ nodes }: Props) {
    return (
        <div>
            <Renderer nodes={nodes} defaultComponents>
                <Component match={PlaceholderNode.isPlaceholderNode} component={Placeholder} />
                <Component
                    match={StoryBookmarkNode.isStoryBookmarkNode}
                    component={StoryBookmark}
                />
            </Renderer>
        </div>
    );
}
