import {
    getNewsroomLogoUrl,
    getUsedLanguages,
    LocaleObject,
    useCompanyInformation,
    useCurrentLocale,
    useCurrentStory,
    useGetLinkLocaleSlug,
    useGetTranslationUrl,
    useLanguages,
    useNewsroom,
} from '@prezly/theme-kit-nextjs';
import { useRouter } from 'next/router';
import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { stripHtml } from 'string-strip-html';

import { PageSeo } from '@/components';
import { getAbsoluteUrl } from '@/utils';
import type { AlternateLanguageLink } from 'types';

import { Footer } from './Footer';
import { Header } from './Header';
import { SubscribeForm } from './SubscribeForm';

interface Props {
    description?: string;
    imageUrl?: string;
    title?: string;
}

export function Layout({ children, description, imageUrl, title }: PropsWithChildren<Props>) {
    const currentLocale = useCurrentLocale();
    const newsroom = useNewsroom();
    const companyInformation = useCompanyInformation();
    const languages = useLanguages();
    const currentStory = useCurrentStory();
    const getTranslationUrl = useGetTranslationUrl();
    const getLinkLocaleSlug = useGetLinkLocaleSlug();
    const { asPath } = useRouter();

    const alternateLanguageLinks: AlternateLanguageLink[] = useMemo(() => {
        if (!languages.length) {
            return [];
        }

        const alternateLanguages = getUsedLanguages(languages).filter(
            (language) => language.code !== currentLocale.toUnderscoreCode(),
        );

        return alternateLanguages
            .map((language) => {
                const locale = LocaleObject.fromAnyCode(language.code);

                const translationLink = getTranslationUrl(locale, true);

                if (!translationLink) {
                    return undefined;
                }

                return {
                    hrefLang: locale.toHyphenCode(),
                    href: getAbsoluteUrl(
                        translationLink,
                        newsroom.url,
                        currentStory && translationLink !== '/' ? false : getLinkLocaleSlug(locale),
                    ),
                };
            })
            .filter<AlternateLanguageLink>(Boolean as any);
    }, [
        currentLocale,
        getLinkLocaleSlug,
        getTranslationUrl,
        languages,
        newsroom.url,
        currentStory,
    ]);

    return (
        <>
            <PageSeo
                title={title || companyInformation.name}
                description={description || stripHtml(companyInformation.about).result}
                url={getAbsoluteUrl(asPath, newsroom.url, getLinkLocaleSlug(currentLocale))}
                imageUrl={imageUrl || getNewsroomLogoUrl(newsroom)}
                siteName={companyInformation.name}
                alternateLanguageLinks={alternateLanguageLinks}
                locale={currentLocale}
            />
            <Header />
            <main>{children}</main>
            <SubscribeForm />
            <Footer />
        </>
    );
}
