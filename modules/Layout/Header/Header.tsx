import {
    getCategoryUrl,
    getLocalizedCategoryData,
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

    return (
        <header>
            <ul>
                <li>
                    <Link href="/" passHref>
                        <a>Home</a>
                    </Link>
                </li>
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
                <li>
                    <Link href="/media" passHref>
                        <a>
                            <FormattedMessage {...translations.mediaGallery.title} />
                        </a>
                    </Link>
                </li>
            </ul>
        </header>
    );
}
