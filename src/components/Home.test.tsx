import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen, waitFor } from '@testing-library/react';

import Home from './Home';

describe('<Home />', () => {
    const HOME = (
        <Home />
    );

    const PROJECTS = [
        {
            src: 'tanks.gif',
            alt: '',
        },
        {
            src: 'soul-survivor.gif',
            alt: '',
        },
        {
            src: 'ar-x-ray.gif',
            alt: '',
        },
    ];

    const MEDIUM_DATA = [
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

    beforeEach(() => {
        axiosMock.onGet('/projects').reply(200, PROJECTS);
        axiosMock.onGet('/medium').reply(200, MEDIUM_DATA);
    });

    afterAll(() => {
        axiosMock.reset();
    });

    it('renders a Collage of projects', async () => {
        render(HOME);

        await waitFor(() => {
            expect(screen.queryAllByTestId('collage')).toHaveLength(1);

            const projects = screen.getAllByRole('img');

            expect(projects[0].getAttribute('src')).toBe('tanks.gif');
            expect(projects[1].getAttribute('src')).toBe('soul-survivor.gif');
            expect(projects[2].getAttribute('src')).toBe('ar-x-ray.gif');
        });
    });

    it('renders a Headline', async () => {
        render(HOME);

        await waitFor(() => {
            const headline = screen.getByTestId('headline');

            expect(headline).toHaveTextContent('Software and game developer');
        });
    });

    it('renders a Medium', async () => {
        render(HOME);

        await waitFor(() => {
            expect(screen.getByTestId('medium')).toBeTruthy();
        });
    });

    it('renders nothing when there are no projects', async () => {
        axiosMock.onGet('/projects').reply(200, []);

        render(HOME);

        await waitFor(() => {
            expect(screen.queryAllByTestId('headline')).toHaveLength(0);
            expect(screen.queryAllByTestId('collage')).toHaveLength(0);
            expect(screen.queryAllByTestId('medium')).toHaveLength(0);
        });
    });
});
