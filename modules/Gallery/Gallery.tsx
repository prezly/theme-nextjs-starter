import type { NewsroomGallery } from '@prezly/sdk';
import { getAssetsUrl, getUploadcareGroupUrl } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import { FormattedMessage } from 'react-intl';

import { SlateRenderer } from '@/components';
import { Layout } from '@/modules/Layout';

interface Props {
    gallery: NewsroomGallery;
}

export function Gallery({ gallery }: Props) {
    const { content, images, title, uploadcare_group_uuid } = gallery;

    return (
        <Layout title={title} imageUrl={getAssetsUrl(images[0].uploadcare_image.uuid)}>
            <h1>{title}</h1>
            {uploadcare_group_uuid && (
                <a href={getUploadcareGroupUrl(uploadcare_group_uuid, title)}>
                    <FormattedMessage {...translations.actions.download} />
                </a>
            )}
            <hr />
            <SlateRenderer nodes={JSON.parse(content)} />
        </Layout>
    );
}
