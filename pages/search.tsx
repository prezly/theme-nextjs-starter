import { getNewsroomServerSideProps, processRequest } from '@prezly/theme-kit-nextjs';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import { importMessages } from '@/utils/lang';
import type { BasePageProps } from 'types';

const Search = dynamic(() => import('@/modules/Search'), { ssr: true });

function SearchPage() {
    return <Search />;
}

export const getServerSideProps: GetServerSideProps<BasePageProps> = async (context) => {
    const { serverSideProps } = await getNewsroomServerSideProps(context);

    return processRequest(
        context,
        {
            ...serverSideProps,
            translations: await importMessages(serverSideProps.newsroomContextProps.localeCode),
        },
        '/search',
    );
};

export default SearchPage;
