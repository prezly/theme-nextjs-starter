import { Category, type Story } from '@prezly/sdk';
import { getShortestLocaleCode, getUsedLanguages, LocaleObject } from '@prezly/theme-kit-core';
import { NextContentDelivery } from '@prezly/theme-kit-nextjs/server';

const STORY_API_PAGE_SIZE = 200;
export const SITEMAP_STORY_PAGE_SIZE = 500;

type ContentDeliveryClient = ReturnType<typeof NextContentDelivery.initClient>;
type LocaleCode = Parameters<typeof LocaleObject.fromAnyCode>[0];

interface SitemapUrl {
    location: string;
    changeFrequency: string;
    priority: string;
    alternateLinks?: Array<{ href: string; lang: string }>;
}

export function getSitemapPageCount(totalStories: number) {
    return Math.max(1, Math.ceil(totalStories / SITEMAP_STORY_PAGE_SIZE));
}

export function buildSitemapIndexXml(baseUrl: string, pageCount: number, basePath?: string) {
    const sitemapPath = `${normalizeBasePath(basePath)}/sitemap.xml`;
    const urls = Array.from({ length: pageCount }, (_, page) => {
        const url = new URL(sitemapPath, baseUrl);
        url.searchParams.set('page', String(page));
        return url.toString();
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <sitemap><loc>${escapeXml(url)}</loc></sitemap>`).join('\n')}
</sitemapindex>`;
}

export async function buildSitemapPageXml(
    api: ContentDeliveryClient,
    baseUrl: string,
    page: number,
    basePath?: string,
): Promise<string | null> {
    if (!Number.isSafeInteger(page) || page < 0) {
        return null;
    }

    const offset = page * SITEMAP_STORY_PAGE_SIZE;
    const firstStoryPage = await api.stories({ limit: STORY_API_PAGE_SIZE, offset });
    const totalStories = firstStoryPage.pagination.matched_records_number;

    if (offset >= totalStories && page !== 0) {
        return null;
    }

    const endOffset = Math.min(offset + SITEMAP_STORY_PAGE_SIZE, totalStories);
    const remainingPageRequests = [];
    for (
        let pageOffset = offset + STORY_API_PAGE_SIZE;
        pageOffset < endOffset;
        pageOffset += STORY_API_PAGE_SIZE
    ) {
        remainingPageRequests.push(
            api.stories({
                limit: Math.min(STORY_API_PAGE_SIZE, endOffset - pageOffset),
                offset: pageOffset,
            }),
        );
    }

    const [languages, remainingPages] = await Promise.all([
        api.languages(),
        Promise.all(remainingPageRequests),
    ]);
    const sitemap = new SitemapBuilder(baseUrl, basePath, languages);

    if (page === 0) {
        const [newsroom, categories] = await Promise.all([api.newsroom(), api.categories()]);
        sitemap.addPageUrl('/');
        if (newsroom.public_galleries_number > 0) {
            sitemap.addPageUrl('/media');
            const { galleries } = await api.galleries();
            for (const gallery of galleries) {
                sitemap.addPageUrl(`/media/album/${gallery.uuid}`);
            }
        }
        for (const category of categories) {
            sitemap.addCategoryUrl(category);
        }
    }

    for (const story of firstStoryPage.stories) {
        sitemap.addStoryUrl(story);
    }
    for (const storyPage of remainingPages) {
        for (const story of storyPage.stories) {
            sitemap.addStoryUrl(story);
        }
    }

    return sitemap.serialize();
}

export function normalizeBaseUrl(baseUrl: string, protocol = 'https') {
    if (/^(\/|localhost|https?:\/\/)/.test(baseUrl)) {
        return baseUrl;
    }
    if (protocol.toLowerCase() === 'http') {
        return `http://${baseUrl}`;
    }
    return `https://${baseUrl}`;
}

function normalizeBasePath(basePath?: string) {
    if (!basePath) {
        return '';
    }
    const withLeadingSlash = basePath.startsWith('/') ? basePath : `/${basePath}`;
    return withLeadingSlash.endsWith('/') ? withLeadingSlash.slice(0, -1) : withLeadingSlash;
}

class SitemapBuilder {
    private readonly usedLanguages;
    private readonly urls: SitemapUrl[] = [];

    constructor(
        private readonly baseUrl: string,
        private readonly basePath: string | undefined,
        languages: Awaited<ReturnType<ContentDeliveryClient['languages']>>,
    ) {
        this.usedLanguages = getUsedLanguages(languages).sort((a, b) => {
            if (a.is_default) return -1;
            if (b.is_default) return 1;
            return 0;
        });
    }

    private buildUrl(location: string, localeCode?: LocaleCode) {
        const shortestLocaleCode = localeCode
            ? getShortestLocaleCode(this.usedLanguages, LocaleObject.fromAnyCode(localeCode))
            : false;
        const basePart = normalizeBasePath(this.basePath);
        const localePart = shortestLocaleCode
            ? `/${LocaleObject.fromAnyCode(shortestLocaleCode).toUrlSlug()}`
            : '';
        const finalPart = (basePart || localePart) && location === '/' ? '' : location;
        return this.baseUrl + basePart + localePart + finalPart;
    }

    addPageUrl(url: string) {
        for (const { code } of this.usedLanguages) {
            this.urls.push({
                location: this.buildUrl(url, code),
                changeFrequency: SitemapBuilder.guessFrequency(url),
                priority: SitemapBuilder.guessPriority(url),
                alternateLinks: this.usedLanguages.map((language) => ({
                    href: this.buildUrl(url, language.code),
                    lang: LocaleObject.fromAnyCode(language.code).toUrlSlug(),
                })),
            });
        }
    }

    addStoryUrl(story: Story) {
        const translations = new Map<string, { slug: string; culture: { code: LocaleCode } }>();
        for (const translation of story.translations) {
            if (
                this.usedLanguages.some(({ code }) => code === translation.culture.code) &&
                translation.status === 'published'
            ) {
                translations.set(translation.culture.code, translation);
            }
        }
        translations.set(story.culture.code, story);

        const url = `/${story.slug}`;
        this.urls.push({
            location: this.buildUrl(url),
            changeFrequency: SitemapBuilder.guessFrequency(url),
            priority: SitemapBuilder.guessPriority(url),
            ...(translations.size > 1 && {
                alternateLinks: Array.from(translations.values()).map((translatedStory) => ({
                    href: this.buildUrl(`/${translatedStory.slug}`),
                    lang: LocaleObject.fromAnyCode(translatedStory.culture.code).toUrlSlug(),
                })),
            }),
        });
    }

    addCategoryUrl(category: Category) {
        const translations = Object.values(category.i18n).filter((translation) =>
            this.usedLanguages.some(({ code }) => code === translation.locale.code),
        );
        for (const { code } of this.usedLanguages) {
            const translatedCategory = Category.translation(category, code);
            if (translatedCategory) {
                const url = `/category/${translatedCategory.slug}`;
                this.urls.push({
                    location: this.buildUrl(url, code),
                    changeFrequency: SitemapBuilder.guessFrequency(url),
                    priority: SitemapBuilder.guessPriority(url),
                    ...(translations.length > 1 && {
                        alternateLinks: translations.map((translation) => ({
                            href: this.buildUrl(
                                `/category/${translation.slug}`,
                                translation.locale.code,
                            ),
                            lang: LocaleObject.fromAnyCode(translation.locale.code).toUrlSlug(),
                        })),
                    }),
                });
            }
        }
    }

    serialize() {
        return [
            '<?xml version="1.0" encoding="UTF-8" ?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/TR/xhtml11/xhtml11_schema.html">',
            this.urls.map(SitemapBuilder.serializeLocation).join('\n'),
            '</urlset>',
        ].join('\n');
    }

    private static guessFrequency(location: string) {
        return location === '/' ? 'daily' : 'weekly';
    }

    private static guessPriority(location: string) {
        if (location === '/') return '0.9';
        if (location.startsWith('/category/')) return '0.8';
        return '0.7';
    }

    private static serializeLocation(url: SitemapUrl) {
        return [
            '<url>',
            url.location && `\t<loc>${escapeXml(url.location)}</loc>`,
            url.changeFrequency && `\t<changefreq>${url.changeFrequency}</changefreq>`,
            url.priority && `\t<priority>${url.priority}</priority>`,
            url.alternateLinks?.map(
                ({ lang, href }) =>
                    `\t<xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(
                        href,
                    )}"/>`,
            ),
            '</url>',
        ]
            .flat()
            .filter(Boolean)
            .join('\n');
    }
}

function escapeXml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}
