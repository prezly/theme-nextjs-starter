import type { AlgoliaStory } from '@prezly/theme-kit-core';
import { getStoryPublicationDate } from '@prezly/theme-kit-core';
import Link from 'next/link';
import type { Hit as HitType } from 'react-instantsearch-core';
import { Highlight } from 'react-instantsearch-dom';
import { FormattedDate } from 'react-intl';

interface Props {
    hit: HitType<{ attributes: AlgoliaStory }>;
}

export function Hit({ hit }: Props) {
    const { attributes: story } = hit;
    const { categories } = story;
    const date = getStoryPublicationDate(story);

    return (
        <div>
            <h3>
                <Link href={`/${story.slug}`} locale={false}>
                    <Highlight hit={hit} attribute="attributes.title" tagName="mark" />
                </Link>
            </h3>
            {categories.length > 0 && (
                <div>{categories.map((category) => category.name).join(', ')}</div>
            )}
            {date && (
                <p>
                    <FormattedDate value={date} year="numeric" month="long" day="numeric" />
                </p>
            )}
        </div>
    );
}
