import { shallow } from 'enzyme';
import Headline from './Headline';

describe('<Headline />', () => {
    it('renders two <span> for the two keywords', () => {
        const wrapper = shallow(<Headline content="This is my headline" keywords={{ "is": "#FF0000", "headline": "#0000FF" }} />);

        const keywords = wrapper.find("span");

        expect(keywords).toHaveLength(2);
        expect(keywords.get(0).props.style).toHaveProperty("color", "#FF0000");
        expect(keywords.get(1).props.style).toHaveProperty("color", "#0000FF");
    });

    it('displays the content', () => {
        const wrapper = shallow(<Headline content="This is my headline" keywords={{ "is": "#FF0000", "headline": "#0000FF" }} />);

        expect(wrapper.text().includes("This is my headline ")).toBeTruthy();
    });
});
