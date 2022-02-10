import { AVAILABLE_FACET_ATTRIBUTES } from '../utils';

import { Facet } from './Facet';
import { SearchInput } from './SearchInput';

export function Sidebar() {
    return (
        <div>
            <SearchInput />
            {AVAILABLE_FACET_ATTRIBUTES.map((attribute) => (
                <Facet key={attribute} attribute={attribute} />
            ))}
        </div>
    );
}
