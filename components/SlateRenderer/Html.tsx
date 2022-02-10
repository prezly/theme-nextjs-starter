export interface HtmlNode {
    type: 'html';
    content: string;
}

interface Props {
    node: HtmlNode;
}

export function Html({ node }: Props) {
    return <div dangerouslySetInnerHTML={{ __html: node.content }} />;
}
