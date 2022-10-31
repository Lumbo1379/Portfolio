import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';

import httpService from './httpService';
import logger from './logService';

describe('httpService', () => {
    const axiosMock = new MockAdapter(axios);

    afterAll(() => {
        axiosMock.reset();
        jest.restoreAllMocks();
    });

    it('logs errors when they occur', async () => {
        const loggerErrorSpy = jest.spyOn(logger, 'error');
        let error = new AxiosError();

        axiosMock.onGet('/rejectMe').reply(500);

        try {
            await httpService.get('/rejectMe');
        } catch (e: any) {
            error = e;
        }

        expect(loggerErrorSpy).toHaveBeenCalledWith(error);
    });
});
