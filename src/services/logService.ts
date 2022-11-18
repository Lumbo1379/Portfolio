import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { toast } from 'react-toastify';

const init = (): void => {
    /* istanbul ignore next */
    Sentry.init({
        dsn: 'https://b67adde9099e41e2aaac2f953f90ec20@o1154516.ingest.sentry.io/6418501',
        integrations: [new BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
};

const error = (err: Error, showToast: boolean = true): void => {
    /* istanbul ignore next */
    if (process.env.REACT_APP_SEND_ERRORS_TO_SENTRY === 'true') {
        Sentry.captureException(error);
    }

    if (showToast && process.env.REACT_APP_SHOW_TOAST_ERRORS === 'true') {
        toast.error(err.message);
    }

    /* istanbul ignore next */
    if (process.env.REACT_APP_LOG_ERRORS_TO_CONSOLE === 'true') {
        // eslint-disable-next-line no-console
        console.error(err);
    }
}

export default {
    init,
    error,
};
