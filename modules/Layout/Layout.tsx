import { PageSeo } from '@prezly/theme-kit-nextjs';
import type { PropsWithChildren } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';
import { SubscribeForm } from './SubscribeForm';

interface Props {
    description?: string;
    imageUrl?: string;
    title?: string;
}

export function Layout({ children, description, imageUrl, title }: PropsWithChildren<Props>) {
    return (
        <>
            <PageSeo title={title} description={description} imageUrl={imageUrl} />
            <Header />
            <main>{children}</main>
            <SubscribeForm />
            <Footer />
        </>
    );
}
