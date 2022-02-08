import type { AlgoliaStory } from '@prezly/theme-kit-nextjs';
import Link from 'next/link';
import type { Hit as HitType } from 'react-instantsearch-core';
import { Highlight } from 'react-instantsearch-dom';

interface Props {
    hit: HitType<{ attributes: AlgoliaStory }>;
}

export function Hit({ hit }: Props) {
    const { attributes: story } = hit;
    const { categories } = story;

    return (
        <div>
            <div>
                {categories.length > 0 && (
                    <div>{/* <CategoriesList categories={categories} isStatic /> */}</div>
                )}
                <h3>
                    <Link href={`/${story.slug}`} locale={false} passHref>
                        <a>
                            <Highlight hit={hit} attribute="attributes.title" tagName="mark" />
                        </a>
                    </Link>
                </h3>

                <p>{/* <StoryPublicationDate story={story} /> */}</p>
            </div>
        </div>
    );
}
