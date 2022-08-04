import { shallow, ShallowWrapper } from 'enzyme';
import * as rrd from 'react-device-detect';

import ImageContent from './ImageContent';

describe('<ImageContent />', () => {
    beforeAll(() => {
        // @ts-ignore-except
        // eslint-disable-next-line no-import-assign
        rrd.isMobile = false;
    });

    const simulateEventOnEventListener = (wrapper: ShallowWrapper, event: string): void => {
        // Some events behave weirdly when the element is not re-found
        const eventListener = wrapper.find('.image-description-overlay-listener');

        eventListener.simulate(event);
    };

    const imageContent = (
        <ImageContent
            content="This is some image content"
        />
    );

    it('renders the content', () => {
        const wrapper = shallow(imageContent);

        const content = wrapper.find('.image-content-text');

        expect(content).toHaveLength(1);
        expect(content.get(0).props.children).toBe('This is some image content');
    });

    it('renders the background, content, and event listener components with the correct classes', () => {
        const wrapper = shallow(imageContent);

        const components = wrapper.find('div');

        expect(components).toHaveLength(3);
        expect(components.get(0).props.className).toBe(
            'image-tag-overlay-top image-description-overlay background-fadeOut',
        );
        expect(components.get(1).props.className).toBe('image-tag-overlay-top');
        expect(components.get(2).props.className).toBe(
            'image-tag-overlay-top image-description-overlay-listener',
        );
    });

    it('renders the content with the correct classes', () => {
        const wrapper = shallow(imageContent);

        const content = wrapper.find('.image-content-text');

        expect(content.get(0).props.className).toBe('image-content-text text-fadeOut');
    });

    it('handles the appropriate events on desktop', () => {
        const wrapper = shallow(imageContent);

        simulateEventOnEventListener(wrapper, 'mouseOver');

        expect(wrapper.find('.background-fadeIn')).toHaveLength(1);
        expect(wrapper.find('.text-fadeIn')).toHaveLength(1);
        expect(wrapper.find('.background-fadeOut')).toHaveLength(0);
        expect(wrapper.find('.text-fadeOut')).toHaveLength(0);

        simulateEventOnEventListener(wrapper, 'mouseLeave');

        expect(wrapper.find('.background-fadeIn')).toHaveLength(0);
        expect(wrapper.find('.text-fadeIn')).toHaveLength(0);
        expect(wrapper.find('.background-fadeOut')).toHaveLength(1);
        expect(wrapper.find('.text-fadeOut')).toHaveLength(1);

        simulateEventOnEventListener(wrapper, 'click');

        expect(wrapper.find('.background-fadeIn')).toHaveLength(0);
        expect(wrapper.find('.text-fadeIn')).toHaveLength(0);
        expect(wrapper.find('.background-fadeOut')).toHaveLength(1);
        expect(wrapper.find('.text-fadeOut')).toHaveLength(1);
    });

    describe('Mobile events', () => {
        beforeAll(() => {
            // @ts-ignore-except
            // eslint-disable-next-line no-import-assign
            rrd.isMobile = true;
        });

        afterAll(() => {
            // @ts-ignore-except
            // eslint-disable-next-line no-import-assign
            rrd.isMobile = false;
        });

        it('handles the appropriate events on mobile', async () => {
            const wrapper = shallow(imageContent);

            simulateEventOnEventListener(wrapper, 'click');

            expect(wrapper.find('.background-fadeIn')).toHaveLength(1);
            expect(wrapper.find('.text-fadeIn')).toHaveLength(1);
            expect(wrapper.find('.background-fadeOut')).toHaveLength(0);
            expect(wrapper.find('.text-fadeOut')).toHaveLength(0);

            simulateEventOnEventListener(wrapper, 'click');

            expect(wrapper.find('.background-fadeIn')).toHaveLength(0);
            expect(wrapper.find('.text-fadeIn')).toHaveLength(0);
            expect(wrapper.find('.background-fadeOut')).toHaveLength(1);
            expect(wrapper.find('.text-fadeOut')).toHaveLength(1);

            simulateEventOnEventListener(wrapper, 'mouseOver');

            expect(wrapper.find('.background-fadeIn')).toHaveLength(0);
            expect(wrapper.find('.text-fadeIn')).toHaveLength(0);
            expect(wrapper.find('.background-fadeOut')).toHaveLength(1);
            expect(wrapper.find('.text-fadeOut')).toHaveLength(1);

            simulateEventOnEventListener(wrapper, 'mouseLeave');

            expect(wrapper.find('.background-fadeIn')).toHaveLength(0);
            expect(wrapper.find('.text-fadeIn')).toHaveLength(0);
            expect(wrapper.find('.background-fadeOut')).toHaveLength(1);
            expect(wrapper.find('.text-fadeOut')).toHaveLength(1);
        });
    });
});
