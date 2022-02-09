import { LocaleObject, useCompanyInformation, useLanguages } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import { FormattedMessage } from 'react-intl';

export function Footer() {
    const languages = useLanguages();
    const companyInformation = useCompanyInformation();

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

            {languages.length > 0 && (
                <>
                    <hr />
                    {languages.map((language) => (
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
