import { shallow } from 'enzyme';
import Image from './Image';

import tanks from '../media/tanks.gif';

describe('<Image />', () => {
    const image = (
        <Image
            src={tanks}
            alt="Tanks"
            style={{ someStyleProp: 'true' }}
        />
    );

    it('renders an img with the correct properties', () => {
        const wrapper = shallow(image);

        const img = wrapper.find('img');

        expect(img).toHaveLength(1);
        expect(img.get(0).props.style).toHaveProperty('someStyleProp', 'true');
        expect(img.get(0).props.alt).toBe('Tanks');
        expect(img.get(0).props.src).toBe('tanks.gif');
    });

    it('renders an img without any additional styles', () => {
        const wrapper = shallow(<Image
            src={tanks}
            alt="Tanks"
        />);

        const img = wrapper.find('img');

        expect(img.get(0).props.style).toEqual({});
    });

    it('renders an img with the correct classes', () => {
        const wrapper = shallow(image);

        const img = wrapper.find('img');

        expect(img.get(0).props.className).toBe('img-responsive');
    });
});
