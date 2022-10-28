// eslint-disable-next-line import/no-extraneous-dependencies
import NextBundleAnalyzer from '@next/bundle-analyzer';
import { DUMMY_DEFAULT_LOCALE } from '@prezly/theme-kit-nextjs';
import locales from '@prezly/theme-kit-nextjs/build/intl/localeConfig';

const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
    async headers() {
        return [
            {
                source: '/(.*)',
                locale: false,
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=0, must-revalidate',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: 'upgrade-insecure-requests; report-uri https://prezly.report-uri.com/r/d/csp/enforce;',
                    },
                ],
            },
        ];
    },
    images: {
        domains: ['cdn.uc.assets.prezly.com'],
    },
    eslint: {
        dirs: ['@types', 'components', 'contexts', 'hooks', 'modules', 'pages', 'utils'],
    },
    i18n: {
        // These are all the locales you want to support in
        // your application
        locales: [...locales, DUMMY_DEFAULT_LOCALE],
        // This is the default locale you want to be used when visiting
        // a non-locale prefixed path e.g. `/hello`
        // We use Pseudo locale used for localization testing, to reliably determine if we need to fallback to the default newsroom language
        defaultLocale: DUMMY_DEFAULT_LOCALE,
        // Default locale detection is disabled, since the locales would be determined by Prezly API
        localeDetection: false,
    },
});
