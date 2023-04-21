import { getCategoryUrl, getLocalizedCategoryData } from '@prezly/theme-kit-core';
import {
    useAlgoliaSettings,
    useCategories,
    useCurrentLocale,
    useGetLinkLocaleSlug,
} from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

export function Header() {
    const categories = useCategories();
    const currentLocale = useCurrentLocale();
    const getLinkLocaleSlug = useGetLinkLocaleSlug();
    const { ALGOLIA_API_KEY } = useAlgoliaSettings();

    return (
        <header>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <FormattedMessage {...translations.categories.title} />
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id}>
                                <Link
                                    href={getCategoryUrl(category, currentLocale)}
                                    locale={getLinkLocaleSlug()}
                                >
                                    {getLocalizedCategoryData(category, currentLocale).name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
                <li>
                    <Link href="/media">
                        <FormattedMessage {...translations.mediaGallery.title} />
                    </Link>
                </li>
                {ALGOLIA_API_KEY && (
                    <li>
                        <Link href="/search">
                            <FormattedMessage {...translations.search.title} />
                        </Link>
                    </li>
                )}
            </ul>
        </header>
    );
}
