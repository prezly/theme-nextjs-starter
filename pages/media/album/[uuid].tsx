import type { NewsroomGallery } from '@prezly/sdk';
import { getNewsroomServerSideProps, processRequest } from '@prezly/theme-kit-nextjs';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import type { FunctionComponent } from 'react';

import { importMessages, isTrackingEnabled } from '@/utils';
import type { BasePageProps } from 'types';

interface Props extends BasePageProps {
    gallery: NewsroomGallery;
}

const Gallery = dynamic(() => import('@/modules/Gallery'), { ssr: true });

const GalleryPage: FunctionComponent<Props> = ({ gallery }) => <Gallery gallery={gallery} />;

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
            isTrackingEnabled: isTrackingEnabled(context),
            translations: await importMessages(serverSideProps.newsroomContextProps.localeCode),
        },
        `/media/album/${uuid}`,
    );
};

export default GalleryPage;
