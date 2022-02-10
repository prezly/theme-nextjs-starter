export interface AlternateLanguageLink {
    href: string;
    hrefLang: string;
}

export interface BasePageProps {
    translations: Record<string, any>;
}

export interface PaginationProps {
    currentPage: number;
    itemsTotal: number;
    pageSize: number;
}
