import type { PageProps } from '@prezly/theme-kit-nextjs';
import { DEFAULT_LOCALE, LocaleObject, NewsroomContextProvider } from '@prezly/theme-kit-nextjs';
import type { AppProps } from 'next/app';
import { useMemo } from 'react';
import { IntlProvider } from 'react-intl';

import type { BasePageProps } from 'types';

function App({ Component, pageProps }: AppProps) {
    const { newsroomContextProps, translations, ...customPageProps } = pageProps as PageProps &
        BasePageProps;

    const { localeCode } = newsroomContextProps || {
        localeCode: DEFAULT_LOCALE,
    };
    const locale = useMemo(() => LocaleObject.fromAnyCode(localeCode), [localeCode]);

    // `newsroomContextProps` can be undefined, if there was error when fetching the newsroom props.
    // This can happen due to connection issues, or incorrect credentials in your .env file.
    // In this case, a 500 error page would be rendered, which shouldn't rely on the Newsroom Context (especially when statically generated).
    if (!newsroomContextProps) {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <Component {...customPageProps} />;
    }

    /* eslint-disable react/jsx-props-no-spreading */
    return (
        <NewsroomContextProvider {...newsroomContextProps}>
            <IntlProvider
                locale={locale.toHyphenCode()}
                defaultLocale={DEFAULT_LOCALE}
                messages={translations}
            >
                <Component {...customPageProps} />
            </IntlProvider>
        </NewsroomContextProvider>
    );
    /* eslint-enable react/jsx-props-no-spreading */
}

export default App;
