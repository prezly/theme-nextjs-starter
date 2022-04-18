import { AnalyticsContextProvider } from '@prezly/analytics-nextjs';
import type { PageProps } from '@prezly/theme-kit-nextjs';
import { DEFAULT_LOCALE, LocaleObject, NewsroomContextProvider } from '@prezly/theme-kit-nextjs';
import type { AppProps } from 'next/app';
import { useMemo } from 'react';
import { IntlProvider } from 'react-intl';

import type { BasePageProps } from 'types';

function App({ Component, pageProps }: AppProps) {
    const { newsroomContextProps, translations, isTrackingEnabled, ...customPageProps } =
        pageProps as PageProps & BasePageProps;
    const { localeCode, newsroom, currentStory } = newsroomContextProps;
    const locale = useMemo(() => LocaleObject.fromAnyCode(localeCode), [localeCode]);

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <NewsroomContextProvider {...newsroomContextProps}>
            <IntlProvider
                locale={locale.toHyphenCode()}
                defaultLocale={DEFAULT_LOCALE}
                messages={translations}
            >
                <AnalyticsContextProvider
                    isEnabled={isTrackingEnabled}
                    newsroom={newsroom}
                    story={currentStory}
                >
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <Component {...customPageProps} />
                </AnalyticsContextProvider>
            </IntlProvider>
        </NewsroomContextProvider>
    );
}

export default App;
