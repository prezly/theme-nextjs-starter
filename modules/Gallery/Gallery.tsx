import type { NewsroomGallery } from '@prezly/sdk';
import { getAssetsUrl, getUploadcareGroupUrl } from '@prezly/theme-kit-core';
import translations from '@prezly/themes-intl-messages';
import { FormattedMessage } from 'react-intl';

import { ContentRenderer } from '@/components';
import { Layout } from '@/modules/Layout';

interface Props {
    gallery: NewsroomGallery;
}

export function Gallery({ gallery }: Props) {
    const { content, images, name, uploadcare_group_uuid } = gallery;

    return (
        <Layout title={name} imageUrl={getAssetsUrl(images[0].uploadcare_image.uuid)}>
            <h1>{name}</h1>
            {uploadcare_group_uuid && (
                <a href={getUploadcareGroupUrl(uploadcare_group_uuid, name)}>
                    <FormattedMessage {...translations.actions.download} />
                </a>
            )}
            <hr />
            <ContentRenderer nodes={JSON.parse(content)} />
        </Layout>
    );
}
