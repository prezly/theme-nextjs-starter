import {
    getCategoryUrl,
    getLocalizedCategoryData,
    useCategories,
    useCurrentLocale,
    useGetLinkLocaleSlug,
} from '@prezly/theme-kit-nextjs';
import Link from 'next/link';

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
            </ul>
        </header>
    );
}
