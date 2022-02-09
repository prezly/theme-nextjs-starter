import {
    getCategoryUrl,
    getLocalizedCategoryData,
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
                    <Link href="/" passHref>
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <FormattedMessage {...translations.categories.title} />
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id}>
                                <Link
                                    href={getCategoryUrl(category, currentLocale)}
                                    locale={getLinkLocaleSlug()}
                                    passHref
                                >
                                    <a>{getLocalizedCategoryData(category, currentLocale).name}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
                <li>
                    <Link href="/media" passHref>
                        <a>
                            <FormattedMessage {...translations.mediaGallery.title} />
                        </a>
                    </Link>
                </li>
                {ALGOLIA_API_KEY && (
                    <li>
                        <Link href="/search" passHref>
                            <a>
                                <FormattedMessage {...translations.search.title} />
                            </a>
                        </Link>
                    </li>
                )}
            </ul>
        </header>
    );
}
