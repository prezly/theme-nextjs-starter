import { translations } from '@prezly/theme-kit-intl';
import type { MessageDescriptor } from 'react-intl';

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export function validateEmail(email: string): MessageDescriptor | undefined {
    if (!email) {
        return translations.errors.fieldRequired;
    }
    if (!EMAIL_REGEX.test(email)) {
        return translations.errors.emailInvalid;
    }

    return undefined;
}
