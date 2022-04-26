import type { NewsroomGallery } from '@prezly/sdk';
import { useInfiniteGalleriesLoading } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import { Layout } from '@/modules/Layout';
import type { PaginationProps } from 'types';

interface Props {
    initialGalleries: NewsroomGallery[];
    pagination: PaginationProps;
}

export function Galleries({ initialGalleries, pagination }: Props) {
    const { formatMessage } = useIntl();

    const { canLoadMore, galleries, isLoading, loadMoreGalleries } = useInfiniteGalleriesLoading(
        initialGalleries,
        pagination,
    );

    return (
        <Layout title={formatMessage(translations.mediaGallery.title)}>
            {galleries.map((gallery) => (
                <Link key={gallery.uuid} href={`/media/album/${gallery.uuid}`} passHref>
                    <a style={{ display: 'block' }}>{gallery.title}</a>
                </Link>
            ))}

            {canLoadMore && (
                <button onClick={loadMoreGalleries}>
                    {formatMessage(
                        isLoading ? translations.misc.stateLoading : translations.actions.loadMore,
                    )}
                </button>
            )}
        </Layout>
    );
}
