import type { AlgoliaStory } from '@prezly/theme-kit-core';
import { translations } from '@prezly/theme-kit-intl';
import type { Hit as HitType, InfiniteHitsProvided } from 'react-instantsearch-core';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import { useIntl } from 'react-intl';

import { useAlgoliaState } from '../context';

import { Hit } from './Hit';

type SearchHit = HitType<{ attributes: AlgoliaStory }>;

function ResultsComponent({ hits, hasMore, refineNext }: InfiniteHitsProvided<SearchHit>) {
    const { formatMessage } = useIntl();
    const { searching: isSearching } = useAlgoliaState();

    return (
        <div>
            <div>
                {!hits.length && (
                    <p>
                        {formatMessage(
                            isSearching
                                ? translations.misc.stateLoading
                                : translations.search.noResults,
                        )}
                    </p>
                )}
                {hits.map((hit) => (
                    <Hit key={hit.objectID} hit={hit} />
                ))}
            </div>

            {hasMore && (
                <button onClick={refineNext}>
                    {formatMessage(
                        isSearching
                            ? translations.misc.stateLoading
                            : translations.actions.loadMore,
                    )}
                </button>
            )}
        </div>
    );
}

export const Results = connectInfiniteHits(ResultsComponent);
