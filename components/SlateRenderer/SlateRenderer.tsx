import { Component, Renderer } from '@prezly/content-renderer-react-js';
import type { Node } from '@prezly/story-content-format';
import { StoryBookmarkNode, VariableNode } from '@prezly/story-content-format';
import '@prezly/content-renderer-react-js/styles.css';

import { StoryBookmark, Variable } from './components';

interface Props {
    nodes: Node | Node[];
}

export function SlateRenderer({ nodes }: Props) {
    return (
        <div>
            <Renderer nodes={nodes} defaultComponents>
                <Component match={VariableNode.isVariableNode} component={Variable} />
                <Component
                    match={StoryBookmarkNode.isStoryBookmarkNode}
                    component={StoryBookmark}
                />
            </Renderer>
        </div>
    );
}
