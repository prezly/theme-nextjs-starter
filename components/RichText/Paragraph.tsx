import type { ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

export function Paragraph({ children }: Props) {
    return <p>{children}</p>;
}
