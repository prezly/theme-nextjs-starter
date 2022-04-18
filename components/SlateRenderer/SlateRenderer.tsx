import type { ComponentRenderers } from '@prezly/content-renderer-react-js';
import { Renderer } from '@prezly/content-renderer-react-js';
import type { Node } from '@prezly/slate-types';
import {
    ATTACHMENT_NODE_TYPE,
    BULLETED_LIST_NODE_TYPE,
    GALLERY_NODE_TYPE,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    HTML_NODE_TYPE,
    IMAGE_NODE_TYPE,
    LINK_NODE_TYPE,
    LIST_ITEM_NODE_TYPE,
    LIST_ITEM_TEXT_NODE_TYPE,
    NUMBERED_LIST_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
    PLACEHOLDER_NODE_TYPE,
    QUOTE_NODE_TYPE,
} from '@prezly/slate-types';

import '@prezly/content-renderer-react-js/styles.css';
import {
    Heading,
    Html,
    Link,
    List,
    ListItem,
    ListItemText,
    Paragraph,
    Quote,
} from '@/components/RichText';
import { Attachment, Gallery, Image, Placeholder } from '@/components/SlateRenderer/components';

interface Props {
    nodes: Node | Node[];
}

const components: ComponentRenderers = {
    [ATTACHMENT_NODE_TYPE]: Attachment,
    [BULLETED_LIST_NODE_TYPE]: List,
    [GALLERY_NODE_TYPE]: Gallery,
    [HEADING_1_NODE_TYPE]: Heading,
    [HEADING_2_NODE_TYPE]: Heading,
    [HTML_NODE_TYPE]: Html,
    [IMAGE_NODE_TYPE]: Image,
    [LINK_NODE_TYPE]: Link,
    [LIST_ITEM_NODE_TYPE]: ListItem,
    [LIST_ITEM_TEXT_NODE_TYPE]: ListItemText,
    [NUMBERED_LIST_NODE_TYPE]: List,
    [PARAGRAPH_NODE_TYPE]: Paragraph,
    [PLACEHOLDER_NODE_TYPE]: Placeholder,
    [QUOTE_NODE_TYPE]: Quote,
};

export function SlateRenderer({ nodes }: Props) {
    return (
        <div>
            <Renderer nodes={nodes} components={components} />
        </div>
    );
}
