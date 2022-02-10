/**
 * We rely on `newsroomContextProps` being defined in both _document.tsx and _app.tsx.
 * This is handy if you want to show a custom error page (e.g. 404) while also rendering
 * other components, e.g. header and/or footer with proper translations.
 */

import type { PageProps } from '@prezly/theme-kit-nextjs';
import { getPrezlyApi } from '@prezly/theme-kit-nextjs';
import type { NextPage, NextPageContext } from 'next';
import type { ErrorProps } from 'next/error';
import NextError from 'next/error';

import { importMessages } from '@/utils';
import type { BasePageProps } from 'types';

enum StatusCode {
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

type ErrorPropsWithExtraSentryProps = ErrorProps & {
    hasGetInitialPropsRun: boolean;
    error?: Error | null;
};

type NotFoundProps = {
    statusCode: StatusCode.NOT_FOUND;
} & BasePageProps;
type InternalServerErrorProps = {
    statusCode: StatusCode.INTERNAL_SERVER_ERROR;
};
type Props = ErrorPropsWithExtraSentryProps & (NotFoundProps | InternalServerErrorProps);

const ErrorPage: NextPage<Props> = (props) => {
    const { statusCode } = props;

    return <NextError statusCode={statusCode} />;
};

// TODO: This seems to trigger on client side sometimes, which causes crashing
ErrorPage.getInitialProps = async (context: NextPageContext): Promise<Props> => {
    const { req: request, res: response, err: error, locale } = context;

    // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
    // getInitialProps has run
    const baseInitialProps = {
        ...(await NextError.getInitialProps(context)),
        hasGetInitialPropsRun: true,
        error,
    };

    const statusCode: StatusCode = response?.statusCode || error?.statusCode || 404;

    let extraInitialProps: NotFoundProps | InternalServerErrorProps;
    if (statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
        extraInitialProps = { statusCode } as InternalServerErrorProps;
    } else {
        const api = getPrezlyApi(request);
        const { newsroomContextProps } = await api.getNewsroomServerSideProps(request, locale);
        const translations = await importMessages(newsroomContextProps.localeCode);

        extraInitialProps = { newsroomContextProps, statusCode, translations } as NotFoundProps &
            PageProps;
    }

    // Running on the server, the response object (`res`) is available.
    //
    // Next.js will pass an err on the server if a page's data fetching methods
    // threw or returned a Promise that rejected
    //
    // Running on the client (browser), Next.js will provide an err if:
    //
    //  - a page's `getInitialProps` threw or returned a Promise that rejected
    //  - an exception was thrown somewhere in the React lifecycle (render,
    //    componentDidMount, etc) that was caught by Next.js's React Error
    //    Boundary. Read more about what types of exceptions are caught by Error
    //    Boundaries: https://reactjs.org/docs/error-boundaries.html

    return { ...baseInitialProps, ...extraInitialProps };
};

export default ErrorPage;
