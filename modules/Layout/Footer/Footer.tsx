import { LocaleObject } from '@prezly/theme-kit-core';
import { useCompanyInformation } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import { FormattedMessage } from 'react-intl';

import { useDisplayedLanguages } from '@/hooks';

export function Footer() {
    const companyInformation = useCompanyInformation();
    const displayedLanguages = useDisplayedLanguages();

    return (
        <footer>
            <h2>
                <FormattedMessage
                    {...translations.boilerplate.title}
                    values={{
                        companyName: companyInformation.name,
                    }}
                />
            </h2>

            <div dangerouslySetInnerHTML={{ __html: companyInformation.about }} />

            <address>{companyInformation.address}</address>

            {displayedLanguages.length > 0 && (
                <>
                    <hr />
                    {displayedLanguages.map((language) => (
                        <li key={language.code}>
                            <a href={`/${LocaleObject.fromAnyCode(language.code).toUrlSlug()}`}>
                                {language.locale.native_name}
                            </a>
                        </li>
                    ))}
                </>
            )}
        </footer>
    );
}
