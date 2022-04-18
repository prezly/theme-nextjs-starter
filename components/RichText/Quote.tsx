import type { PropsWithChildren } from 'react';

import { IconQuoteClosing, IconQuoteOpening } from '@/icons';

export function Quote({ children }: PropsWithChildren<any>) {
    return (
        <blockquote>
            <div aria-hidden="true">
                <IconQuoteOpening />
                <IconQuoteOpening />
            </div>
            <div>{children}</div>
            <div aria-hidden="true">
                <IconQuoteClosing />
                <IconQuoteClosing />
            </div>
        </blockquote>
    );
}
