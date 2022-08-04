import { shallow } from 'enzyme';
import Headline from './Headline';

describe('<Headline />', () => {
    const headline = (
        <Headline
            content="This is my headline"
            keywords={{ is: '#FF0000', headline: '#0000FF' }}
        />
    );

    it('renders two <span> for the two keywords', () => {
        const wrapper = shallow(headline);

        const keywords = wrapper.find('span');

        expect(keywords).toHaveLength(2);
        expect(keywords.get(0).props.style).toHaveProperty('background', '#FF0000');
        expect(keywords.get(1).props.style).toHaveProperty('background', '#0000FF');
    });

    it('renders a h1 with the correct classes', () => {
        const wrapper = shallow(headline);

        const h1 = wrapper.find('h1');

        expect(h1).toHaveLength(1);
        expect(h1.get(0).props.className).toBe('display-1');
    });

    it('displays the content', () => {
        const wrapper = shallow(headline);

        expect(wrapper.text().includes('This is my headline')).toBeTruthy();
    });

    it('displays the content without passing keywords', () => {
        const wrapper = shallow(<Headline content="This is my headline" />);
        const keywords = wrapper.find('span');

        expect(keywords).toHaveLength(0);
        expect(wrapper.text().includes('This is my headline')).toBeTruthy();
    });
});
