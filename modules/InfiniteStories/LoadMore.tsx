import { translations } from '@prezly/theme-kit-intl';
import { useIntl } from 'react-intl';

interface Props {
    isLoading: boolean;
    onLoadMore: () => void;
}

export function LoadMore({ isLoading, onLoadMore }: Props) {
    const { formatMessage } = useIntl();

    return (
        <button
            type="button"
            onClick={onLoadMore}
            disabled={isLoading}
            style={{ display: 'block', marginBlock: '20px' }}
        >
            {formatMessage(
                isLoading ? translations.misc.stateLoading : translations.actions.loadMore,
            )}
        </button>
    );
}
