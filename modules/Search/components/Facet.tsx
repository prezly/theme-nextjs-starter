import translations from '@prezly/themes-intl-messages';
import { useCallback, useMemo } from 'react';
import type { RefinementListExposed, RefinementListProvided } from 'react-instantsearch-core';
import { connectRefinementList } from 'react-instantsearch-dom';
import { FormattedDate, FormattedMessage } from 'react-intl';

import { FacetAttribute } from '../types';

function FacetComponent({
    attribute,
    items,
    refine,
}: RefinementListProvided & RefinementListExposed) {
    const facetTitle = useMemo(() => {
        switch (attribute) {
            case FacetAttribute.CATEGORY:
                return <FormattedMessage {...translations.searchFacets.category} />;
            case FacetAttribute.YEAR:
                return <FormattedMessage {...translations.searchFacets.year} />;
            case FacetAttribute.MONTH:
                return <FormattedMessage {...translations.searchFacets.month} />;
            default:
                return attribute;
        }
    }, [attribute]);

    const getItemLabel = useCallback(
        (item: typeof items[0]) => {
            switch (attribute) {
                case FacetAttribute.MONTH: {
                    const date = new Date();
                    date.setMonth(Number(item.label));
                    return <FormattedDate value={date} month="long" />;
                }
                default:
                    return item.label;
            }
        },
        [attribute],
    );

    if (!items.length) {
        return null;
    }

    return (
        <>
            <span>{facetTitle}</span>
            <ul>
                {items.map((item) => (
                    <li key={item.label}>
                        <label>
                            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                            <input
                                type="checkbox"
                                checked={item.isRefined}
                                onChange={() => refine(item.value)}
                            />
                            <span>{getItemLabel(item)}</span>
                            <span>({item.count})</span>
                        </label>
                    </li>
                ))}
            </ul>
        </>
    );
}

export const Facet = connectRefinementList(FacetComponent);
