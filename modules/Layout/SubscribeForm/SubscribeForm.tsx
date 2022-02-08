import HCaptcha from '@hcaptcha/react-hcaptcha';
import { getPrivacyPortalUrl, useCurrentLocale, useNewsroom } from '@prezly/theme-kit-nextjs';
import translations from '@prezly/themes-intl-messages';
import type { FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { getLocaleCodeForCaptcha, validateEmail } from './utils';

// eslint-disable-next-line prefer-destructuring
const NEXT_PUBLIC_HCAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY;

export function SubscribeForm() {
    const newsroom = useNewsroom();
    const currentLocale = useCurrentLocale();
    const { formatMessage } = useIntl();

    const captchaRef = useRef<HCaptcha>(null);

    const [captchaToken, setCaptchaToken] = useState<string>();
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>();

    function handleSubmit(event?: FormEvent<HTMLFormElement>) {
        try {
            setEmailError(undefined);

            if (event) {
                event.preventDefault();
            }

            if (!captchaRef.current) {
                throw new Error(formatMessage(translations.errors.unknown));
            }

            const errorMessageDescriptor = validateEmail(email);
            if (errorMessageDescriptor) {
                throw new Error(formatMessage(errorMessageDescriptor));
            }

            if (!captchaToken) {
                captchaRef.current.execute();
                return;
            }

            window.location.href = getPrivacyPortalUrl(newsroom, currentLocale, { email });
        } catch (error) {
            if (error instanceof Error) {
                setEmailError(error.message);
            }
        }
    }

    function handleCaptchaVerify(token: string) {
        setCaptchaToken(token);
        handleSubmit();
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

                {NEXT_PUBLIC_HCAPTCHA_SITEKEY && (
                    <HCaptcha
                        sitekey={NEXT_PUBLIC_HCAPTCHA_SITEKEY}
                        size="invisible"
                        ref={captchaRef}
                        onVerify={handleCaptchaVerify}
                        onExpire={() => setCaptchaToken(undefined)}
                        languageOverride={getLocaleCodeForCaptcha(currentLocale)}
                    />
                )}
            </form>
        </div>
    );
}
