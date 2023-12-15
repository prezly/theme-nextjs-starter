import { translations } from '@prezly/theme-kit-intl';
import type { SearchBoxExposed, SearchBoxProvided } from 'react-instantsearch-core';
import { connectSearchBox } from 'react-instantsearch-dom';
import { FormattedMessage, useIntl } from 'react-intl';

function SearchInputComponent({ currentRefinement, refine }: SearchBoxProvided & SearchBoxExposed) {
    const { formatMessage } = useIntl();

    return (
        <form method="GET" action="/search">
            <label>
                <FormattedMessage {...translations.search.inputLabel} />
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <input
                    type="search"
                    name="query"
                    value={currentRefinement}
                    onChange={(event) => refine(event.currentTarget.value)}
                    placeholder={formatMessage(translations.search.inputHint, {
                        inputHintExtra: '',
                    })}
                    autoComplete="off"
                />
            </label>
        </form>
    );
}

export const SearchInput = connectSearchBox(SearchInputComponent);
