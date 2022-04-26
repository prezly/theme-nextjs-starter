import type { NewsroomGallery } from '@prezly/sdk';
import { getNewsroomServerSideProps, processRequest } from '@prezly/theme-kit-nextjs';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import { importMessages } from '@/utils';
import type { BasePageProps } from 'types';

interface Props extends BasePageProps {
    gallery: NewsroomGallery;
}

const Gallery = dynamic(() => import('@/modules/Gallery'), { ssr: true });

function GalleryPage({ gallery }: Props) {
    return <Gallery gallery={gallery} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { api, serverSideProps } = await getNewsroomServerSideProps(context);

    const { uuid } = context.params as { uuid: string };
    const gallery = await api.getGallery(uuid);
    if (!gallery) {
        return { notFound: true };
    }

    return processRequest(
        context,
        {
            ...serverSideProps,
            gallery,
            translations: await importMessages(serverSideProps.newsroomContextProps.localeCode),
        },
        `/media/album/${uuid}`,
    );
};

export default GalleryPage;
