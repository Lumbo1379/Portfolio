import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen, waitFor } from '@testing-library/react';

import Medium from './Medium';
import logger from '../services/logService';

describe('<Medium />', () => {
    const MEDIUM = (
        <Medium />
    );

    const IMAGES = [
        {
            src: 'www.profilePic.com',
            alt: '',
        },
        {
            src: 'www.articlePic1.com',
            alt: '',
        },
        {
            src: 'www.articlePic2.com',
            alt: '',
        },
        {
            src: 'www.articlePic3.com',
            alt: '',
        },
    ];

    const axiosMock = new MockAdapter(axios);

    afterAll(() => {
        axiosMock.reset();
        jest.restoreAllMocks();
    });

    it('renders nothing when there is no Medium data', async () => {
        axiosMock.onGet('/medium').reply(200, []);

        render(MEDIUM);

        await waitFor(() => {
            expect(screen.queryAllByTestId('medium')).toHaveLength(0);
        });
    });

    it('renders nothing when there is no Medium returns nothing', async () => {
        axiosMock.onGet('/medium').reply(200, null);

        render(MEDIUM);

        await waitFor(() => {
            expect(screen.queryAllByTestId('medium')).toHaveLength(0);
        });
    });

    it('displays an error when Medium returns an unexpected length of data', async () => {
        const erroneousImages = [...IMAGES, {
            src: 'www.oopsPic1.com',
            alt: '',
        }];

        axiosMock.onGet('/medium').reply(200, erroneousImages);
        const loggerErrorSpy = jest.spyOn(logger, 'error');

        render(MEDIUM);

        await waitFor(() => {
            expect(loggerErrorSpy).toHaveBeenCalledWith(
                'Exactly three articles and one profile picture are required',
            );
            expect(screen.queryAllByTestId('medium')).toHaveLength(1);
        });
    });

    it('displays a Collage an no error with expected data', async () => {
        axiosMock.onGet('/medium').reply(200, IMAGES);
        const loggerErrorSpy = jest.spyOn(logger, 'error');

        render(MEDIUM);

        await waitFor(() => {
            expect(loggerErrorSpy).toHaveBeenCalledTimes(0);
            expect(screen.queryAllByTestId('medium')).toHaveLength(1);
        });
    });
});
