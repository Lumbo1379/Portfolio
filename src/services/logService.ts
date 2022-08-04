import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { toast } from 'react-toastify';

const init = (): void => {
    Sentry.init({
        dsn: 'https://b67adde9099e41e2aaac2f953f90ec20@o1154516.ingest.sentry.io/6418501',
        integrations: [new BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
};

const error = (e: any, showToast: boolean = true): void => {
    // Sentry.captureException(error); // TODO: Ignore in development
    if (showToast) {
        toast.error(e); // TODO: Ignore in production, just log to console
    } else {
        // eslint-disable-next-line no-console
        console.error(e);
    }
};

export default {
    init,
    error,
};
