import { shallow } from 'enzyme';
import Collage from './Collage';

import arXRay from '../media/ar-x-ray.gif';
import tanks from '../media/tanks.gif';
import soulSurvivor from '../media/soul-survivor.gif';

describe('<Collage />', () => {
    const collage = (
        <Collage
            images={[arXRay, soulSurvivor, tanks]}
            layout={[
                [0, 1],
                [0, 2],
            ]}
        />
    );

    it('renders a grid with 2 rows and 2 columns', () => {
        const wrapper = shallow(collage);

        const grid = wrapper.find('.custom-grid');

        expect(grid).toHaveLength(1);
        expect(grid.get(0).props.style).toHaveProperty('--grid-rows', 2);
        expect(grid.get(0).props.style).toHaveProperty('--grid-columns', 2);
    });

    it('renders 3 correctly formatted Images', () => {
        const wrapper = shallow(collage);

        const images = wrapper.find('Image');

        expect(images).toHaveLength(3);
        expect(images.get(0).props.style).toHaveProperty('gridColumn', '1 / 2');
        expect(images.get(0).props.style).toHaveProperty('gridRow', '1 / 3');
        expect(images.get(1).props.style).toHaveProperty('gridColumn', '2 / 3');
        expect(images.get(1).props.style).toHaveProperty('gridRow', '1 / 2');
        expect(images.get(2).props.style).toHaveProperty('gridColumn', '2 / 3');
        expect(images.get(2).props.style).toHaveProperty('gridRow', '2 / 3');
    });

    it('renders a grid with the correct classes', () => {
        const wrapper = shallow(collage);

        const grid = wrapper.find('.custom-grid');

        expect(grid.get(0).props.className).toBe('custom-grid custom-margin');
    });
});
