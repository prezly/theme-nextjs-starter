import Link from 'next/link';
import { useRouter } from 'next/router';
import type { PropsWithChildren } from 'react';

interface Props {
    page: number;
    isDisabled?: boolean;
    isCurrent?: boolean;
}

export function PaginationItem({
    page,
    isDisabled,
    isCurrent,
    children,
}: PropsWithChildren<Props>) {
    const { pathname, query } = useRouter();

    if (isDisabled || isCurrent) {
        return (
            <span
                style={{
                    margin: '0 10px',
                    opacity: isDisabled ? '50%' : undefined,
                    fontWeight: isCurrent ? 'bold' : undefined,
                }}
            >
                {children}
            </span>
        );
    }

    return (
        <Link
            href={{
                pathname,
                query: { ...query, page },
            }}
            passHref
        >
            <a style={{ margin: '0 10px' }}>
                <span>{children}</span>
            </a>
        </Link>
    );
}
