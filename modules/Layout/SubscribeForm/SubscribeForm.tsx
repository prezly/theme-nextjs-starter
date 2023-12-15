import { getPrivacyPortalUrl } from '@prezly/theme-kit-core';
import { translations } from '@prezly/theme-kit-intl';
import { useCurrentLocale, useNewsroom } from '@prezly/theme-kit-nextjs';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { validateEmail } from './utils';

export function SubscribeForm() {
    const newsroom = useNewsroom();
    const currentLocale = useCurrentLocale();
    const { formatMessage } = useIntl();

    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>();

    function handleSubmit(event?: FormEvent<HTMLFormElement>) {
        try {
            setEmailError(undefined);

            if (event) {
                event.preventDefault();
            }

            const errorMessageDescriptor = validateEmail(email);
            if (errorMessageDescriptor) {
                throw new Error(formatMessage(errorMessageDescriptor));
            }

            window.location.href = getPrivacyPortalUrl(newsroom, currentLocale, { email });
        } catch (error) {
            if (error instanceof Error) {
                setEmailError(error.message);
            }
        }
    }

    // Clear the error when user types in a correct value
    useEffect(() => {
        setEmailError((error) => {
            if (error) {
                const errorMessageDescriptor = validateEmail(email);
                return errorMessageDescriptor ? formatMessage(errorMessageDescriptor) : undefined;
            }

            return error;
        });
    }, [email, formatMessage]);

    if (!newsroom.is_subscription_form_enabled) {
        return null;
    }

    return (
        <div>
            <h2>
                <FormattedMessage {...translations.subscription.formTitle} />
            </h2>

            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <label style={{ display: 'block' }}>
                        <FormattedMessage {...translations.subscription.labelEmail} />
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <input
                            name="email"
                            type="email"
                            placeholder={formatMessage(translations.subscription.labelEmail)}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                    </label>
                    <button type="submit">
                        <FormattedMessage {...translations.actions.subscribe} />
                    </button>
                </div>

                <p>
                    <FormattedMessage
                        {...translations.subscription.disclaimer}
                        values={{
                            subscribe: <FormattedMessage {...translations.actions.subscribe} />,
                            privacyPolicyLink: (
                                <a
                                    href={
                                        newsroom.custom_privacy_policy_link ??
                                        'https://www.prezly.com/privacy-policy'
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FormattedMessage
                                        {...translations.subscription.privacyPolicy}
                                    />
                                </a>
                            ),
                        }}
                    />
                </p>
            </form>
        </div>
    );
}
