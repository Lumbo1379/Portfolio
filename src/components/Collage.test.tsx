import { render, screen } from '@testing-library/react';

import Collage from './Collage';

import arXRay from '../media/ar-x-ray.gif';
import tanks from '../media/tanks.gif';
import soulSurvivor from '../media/soul-survivor.gif';

describe('<Collage />', () => {
    const COLLAGE = (
        <Collage
            images={[
                {
                    src: arXRay,
                    alt: '',
                },
                {
                    src: soulSurvivor,
                    alt: '',
                },
                {
                    src: tanks,
                    alt: '',
                },
            ]}
            layout={[
                [0, 1],
                [0, 2],
            ]}
        />
    );

    it('renders a grid with 2 rows and 2 columns', () => {
        const { container } = render(COLLAGE);

        const grid = container.getElementsByClassName('custom-grid');

        expect(grid).toHaveLength(1);
        expect(grid[0]).toHaveStyle('--grid-rows: 2; --grid-columns: 2');
    });

    it('renders 3 correctly formatted Images', () => {
        const { container } = render(COLLAGE);

        const images = screen.getAllByRole('img');
        const containers = container.getElementsByClassName('overlay-container');

        expect(images).toHaveLength(3);
        expect(containers).toHaveLength(3);
        expect(containers[0]).toHaveStyle('gridColumn: 1 / 2; gridRow: 1 / 3');
        expect(containers[1]).toHaveStyle('gridColumn: 2 / 3; gridRow: 1 / 2');
        expect(containers[2]).toHaveStyle('gridColumn: 2 / 3; gridRow: 2 / 3');
    });

    it('renders a grid with the correct classes', () => {
        const { container } = render(COLLAGE);

        const grid = container.getElementsByClassName('custom-grid');

        expect(grid[0]).toHaveClass('custom-grid custom-margin');
    });
});
