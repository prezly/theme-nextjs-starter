import { getSearchPageServerSideProps } from '@prezly/theme-kit-nextjs/server';
import dynamic from 'next/dynamic';
import type { FunctionComponent } from 'react';

import { importMessages } from '@/utils/lang';
import type { BasePageProps } from 'types';

const SearchPage = dynamic(() => import('@/modules/Search'), { ssr: true });

const SearchResultsPage: FunctionComponent<BasePageProps> = () => <SearchPage />;

export const getServerSideProps = getSearchPageServerSideProps(
    async (_, { newsroomContextProps }) => ({
        translations: await importMessages(newsroomContextProps.localeCode),
    }),
);

export default SearchResultsPage;
