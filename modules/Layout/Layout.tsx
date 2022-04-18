import {
    getNewsroomLogoUrl,
    PageSeo,
    useCompanyInformation,
    useNewsroom,
} from '@prezly/theme-kit-nextjs';
import type { PropsWithChildren } from 'react';
import { stripHtml } from 'string-strip-html';

import { Footer } from './Footer';
import { Header } from './Header';
import { SubscribeForm } from './SubscribeForm';

interface Props {
    description?: string;
    imageUrl?: string;
    title?: string;
}

export function Layout({ children, description, imageUrl, title }: PropsWithChildren<Props>) {
    const newsroom = useNewsroom();
    const companyInformation = useCompanyInformation();

    return (
        <>
            <PageSeo
                title={title || companyInformation.name}
                description={description || stripHtml(companyInformation.about).result}
                imageUrl={imageUrl || getNewsroomLogoUrl(newsroom)}
            />
            <Header />
            <main>{children}</main>
            <SubscribeForm />
            <Footer />
        </>
    );
}
