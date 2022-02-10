import type { LocaleObject } from '@prezly/theme-kit-nextjs';
import { NextSeo } from 'next-seo';

import type { AlternateLanguageLink } from 'types';

interface Props {
    alternateLanguageLinks?: AlternateLanguageLink[];
    description?: string;
    imageUrl: string;
    locale: LocaleObject;
    siteName: string;
    title: string;
    url: string;
}

export function PageSeo({
    alternateLanguageLinks,
    description,
    imageUrl,
    locale,
    siteName,
    title,
    url,
}: Props) {
    return (
        <NextSeo
            title={title}
            description={description}
            canonical={url}
            openGraph={{
                url,
                title,
                description,
                locale: locale.toUnderscoreCode(),
                images: [
                    {
                        url: imageUrl,
                        alt: title,
                    },
                ],
                site_name: siteName,
            }}
            twitter={{
                site: siteName,
                cardType: 'summary',
            }}
            additionalMetaTags={[{ name: 'twitter:image', content: imageUrl }]}
            languageAlternates={alternateLanguageLinks}
        />
    );
}
