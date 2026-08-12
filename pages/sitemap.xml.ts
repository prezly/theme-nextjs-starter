import { NextContentDelivery } from '@prezly/theme-kit-nextjs/server';
import type { GetServerSideProps, NextPage } from 'next';

import {
    buildSitemapIndexXml,
    buildSitemapPageXml,
    getSitemapPageCount,
    normalizeBaseUrl,
} from './sitemap-utils';

const CACHE_CONTROL = 'public, max-age=0, s-maxage=900, stale-while-revalidate=86400';

const Sitemap: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
    const baseUrl = normalizeBaseUrl(
        req.headers.host || '/',
        headerValue(req.headers['x-forwarded-proto']),
    );
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
    const api = NextContentDelivery.initClient(req);
    const firstStoryPage = await api.stories({ limit: 1, offset: 0 });
    const pageCount = getSitemapPageCount(firstStoryPage.pagination.matched_records_number);
    const pageParam = query.page;

    if (pageParam === undefined) {
        return xmlResponse(res, buildSitemapIndexXml(baseUrl, pageCount, basePath));
    }

    if (typeof pageParam !== 'string' || !/^\d+$/.test(pageParam)) {
        return notFoundResponse(res);
    }

    const xml = await buildSitemapPageXml(api, baseUrl, Number(pageParam), basePath);
    if (!xml) {
        return notFoundResponse(res);
    }

    return xmlResponse(res, xml);
};

function xmlResponse(res: Parameters<GetServerSideProps>[0]['res'], xml: string) {
    res.setHeader('Cache-Control', CACHE_CONTROL);
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.write(xml);
    res.end();
    return { props: {} };
}

function notFoundResponse(res: Parameters<GetServerSideProps>[0]['res']) {
    res.statusCode = 404;
    res.end('Not Found');
    return { props: {} };
}

function headerValue(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value;
}

export default Sitemap;
