import { useCompanyInformation } from '@prezly/theme-kit-nextjs';

export function Footer() {
    const companyInformation = useCompanyInformation();

    return (
        <footer>
            <h2>
                <>About</> {companyInformation.name}
            </h2>

            <div dangerouslySetInnerHTML={{ __html: companyInformation.about }} />

            <address>{companyInformation.address}</address>
        </footer>
    );
}
