import { toast } from 'react-toastify';

import logger from './logService';

describe('logService', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('creates a toast by default', async () => {
        const toastErrorSpy = jest.spyOn(toast, 'error');

        logger.error(new Error('Some error occured'));

        expect(toastErrorSpy).toHaveBeenCalledWith('Some error occured');
    });

    it('does not create a toast when told', async () => {
        const toastErrorSpy = jest.spyOn(toast, 'error');

        logger.error(new Error('Some error occured'), false);

        expect(toastErrorSpy).toHaveBeenCalledTimes(0);
    });
});
