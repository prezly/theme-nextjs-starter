import { translations } from '@prezly/theme-kit-intl';
import { FormattedMessage, useIntl } from 'react-intl';

import { useAlgoliaState } from '../context';

export function Title() {
    const { formatMessage } = useIntl();
    const { searchState, searchResults } = useAlgoliaState();

    const { query: searchQuery } = searchState;
    const resultsCount = searchResults ? searchResults.nbHits : 0;

    return (
        <>
            <h1>
                {searchQuery
                    ? formatMessage(translations.search.fullResultsTitle)
                    : formatMessage(translations.search.title)}
            </h1>
            {searchQuery && (
                <FormattedMessage
                    {...translations.search.fullResultsSubTitle}
                    values={{
                        resultsCount: <b>{resultsCount}</b>,
                        searchQuery: (
                            <>
                                &quot;<b>{searchQuery}</b>&quot;
                            </>
                        ),
                    }}
                />
            )}
        </>
    );
}
