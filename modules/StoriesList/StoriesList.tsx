import type { Story } from '@prezly/sdk';
import Link from 'next/link';

interface Props {
    stories: Story[];
}

export function StoriesList({ stories }: Props) {
    return (
        <>
            {stories.map((story) => (
                <Link
                    key={story.uuid}
                    href={`/${story.slug}`}
                    style={{ display: 'block', marginBottom: 20 }}
                >
                    <span>{story.title}</span>
                </Link>
            ))}
        </>
    );
}
