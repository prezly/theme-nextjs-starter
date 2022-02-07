interface Props {
    isLoading: boolean;
    onLoadMore: () => void;
}

export function LoadMore({ isLoading, onLoadMore }: Props) {
    return (
        <button
            type="button"
            onClick={onLoadMore}
            disabled={isLoading}
            style={{ display: 'block', marginBlock: '20px' }}
        >
            {isLoading ? 'Please wait...' : 'Load more'}
        </button>
    );
}
