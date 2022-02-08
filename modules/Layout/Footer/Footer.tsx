import { LocaleObject, useCompanyInformation, useLanguages } from '@prezly/theme-kit-nextjs';

export function Footer() {
    const languages = useLanguages();
    const companyInformation = useCompanyInformation();

    return (
        <footer>
            <h2>
                <>About</> {companyInformation.name}
            </h2>

            <div dangerouslySetInnerHTML={{ __html: companyInformation.about }} />

            <address>{companyInformation.address}</address>

            {languages.length > 0 && (
                <>
                    <h2>Languages</h2>
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
