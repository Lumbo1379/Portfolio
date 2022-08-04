import { shallow } from 'enzyme';
import Image from './Image';

import tanks from '../media/tanks.gif';

describe('<Image />', () => {
    const IMAGE = (
        <Image
            src={tanks}
            alt="Tanks"
            config={{
                tags: [[
                    {
                        description: 'Some title',
                        colour: '',
                    },
                ], [
                    {
                        description: 'Tag 1',
                        colour: '##F7D5A1',
                    },
                    {
                        description: 'Tag 2',
                        colour: '',
                    },
                ],
                ],
                link: 'www.somelink.com',
                content: 'Some content',
                style: {
                    someStyleProp: 'true',
                },
            }}
        />
    );

    const SIMPLE_IMAGE = (
        <Image
            src={tanks}
            alt="Tanks"
        />
    );

    it('renders an img with the correct properties', () => {
        const wrapper = shallow(IMAGE);

        const img = wrapper.find('img');

        expect(img).toHaveLength(1);
        expect(img.get(0).props.alt).toBe('Tanks');
        expect(img.get(0).props.src).toBe('tanks.gif');
    });

    it('renders three Tags, including a link', () => {
        const wrapper = shallow(IMAGE);

        const tags = wrapper.find('Tag');

        expect(tags).toHaveLength(3);

        expect(tags.get(0).props.tag).toHaveProperty('description', 'Some title');
        expect(tags.get(0).props.tag).toHaveProperty('colour', '');
        expect(tags.get(0).props.link).toBe('www.somelink.com');

        expect(tags.get(1).props.tag).toHaveProperty('description', 'Tag 1');
        expect(tags.get(1).props.tag).toHaveProperty('colour', '##F7D5A1');

        expect(tags.get(2).props.tag).toHaveProperty('description', 'Tag 2');
        expect(tags.get(2).props.tag).toHaveProperty('colour', '');
    });

    it('renders three Tags inside appropriate containers', () => {
        const wrapper = shallow(IMAGE);

        const upperContainer = wrapper.find('.image-tag-overlay-top');
        const lowerContainer = wrapper.find('.image-tag-overlay-bottom');

        expect(upperContainer).toHaveLength(1);
        expect(upperContainer.children()).toHaveLength(1);
        expect(upperContainer.childAt(0).get(0).props.tag).toHaveProperty('description', 'Some title');

        expect(lowerContainer).toHaveLength(1);
        expect(lowerContainer.children()).toHaveLength(2);
        expect(lowerContainer.childAt(0).get(0).props.tag).toHaveProperty('description', 'Tag 1');
        expect(lowerContainer.childAt(1).get(0).props.tag).toHaveProperty('description', 'Tag 2');
    });

    it('renders no tag containers when there are no Tags', () => {
        const wrapper = shallow(SIMPLE_IMAGE);

        const upperContainer = wrapper.find('.image-tag-overlay-top');
        const lowerContainer = wrapper.find('.image-tag-overlay-bottom');

        expect(upperContainer).toHaveLength(0);
        expect(lowerContainer).toHaveLength(0);
    });

    it('renders an ImageContent', () => {
        const wrapper = shallow(IMAGE);

        const imageContent = wrapper.find('ImageContent');

        expect(imageContent).toHaveLength(1);
        expect(imageContent.get(0).props.content).toBe('Some content');
    });

    it('doesn\'t render an ImageContent when there is no content', () => {
        const wrapper = shallow(SIMPLE_IMAGE);

        const imageContent = wrapper.find('ImageContent');

        expect(imageContent).toHaveLength(0);
    });

    it('renders a container with additional styles', () => {
        const wrapper = shallow(IMAGE);

        const container = wrapper.find('.overlay-container');

        expect(container).toHaveLength(1);
        expect(container.get(0).props.style).toHaveProperty('someStyleProp', 'true');
    });

    it('renders a container without additional styles', () => {
        const wrapper = shallow(SIMPLE_IMAGE);

        const container = wrapper.find('.overlay-container');

        expect(container).toHaveLength(1);
        expect(container.get(0).props.style).toEqual({});
    });

    it('renders an img with the correct classes', () => {
        const wrapper = shallow(IMAGE);

        const img = wrapper.find('img');

        expect(img.get(0).props.className).toBe('img-responsive');
    });

    it('renders a container with the correct classes', () => {
        const wrapper = shallow(IMAGE);

        const container = wrapper.find('.overlay-container');

        expect(container.get(0).props.className).toBe('overlay-container');
    });

    it('renders tag containers with the correct classes', () => {
        const wrapper = shallow(IMAGE);

        const upperContainer = wrapper.find('.image-tag-overlay-top');
        const lowerContainer = wrapper.find('.image-tag-overlay-bottom');

        expect(upperContainer.get(0).props.className).toBe('image-tag-overlay-top');
        expect(lowerContainer.get(0).props.className).toBe('image-tag-overlay-bottom');
    });
});
