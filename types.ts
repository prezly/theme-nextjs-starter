export interface AlternateLanguageLink {
    href: string;
    hrefLang: string;
}

export interface BasePageProps {
    translations: Record<string, any>;
    isTrackingEnabled?: boolean;
}

export interface PaginationProps {
    currentPage: number;
    itemsTotal: number;
    pageSize: number;
}
