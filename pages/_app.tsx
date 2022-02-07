import type { PageProps } from '@prezly/theme-kit-nextjs';
import { DEFAULT_LOCALE, LocaleObject, NewsroomContextProvider } from '@prezly/theme-kit-nextjs';
import type { AppProps } from 'next/app';
import { useMemo } from 'react';
import { IntlProvider } from 'react-intl';

import type { BasePageProps } from 'types';

function App({ Component, pageProps }: AppProps) {
    const { newsroomContextProps, translations, ...customPageProps } = pageProps as PageProps &
        BasePageProps;
    const { localeCode } = newsroomContextProps;
    const locale = useMemo(() => LocaleObject.fromAnyCode(localeCode), [localeCode]);

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <NewsroomContextProvider {...newsroomContextProps}>
            <IntlProvider
                locale={locale.toHyphenCode()}
                defaultLocale={DEFAULT_LOCALE}
                messages={translations}
            >
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Component {...customPageProps} />
            </IntlProvider>
        </NewsroomContextProvider>
    );
}

export default App;
