import { fireEvent, render, screen } from '@testing-library/react';
import * as rrd from 'react-device-detect';

import ImageContent from './ImageContent';

describe('<ImageContent />', () => {
    beforeAll(() => {
        // @ts-ignore-except
        // eslint-disable-next-line no-import-assign
        rrd.isMobile = false;
    });

    const IMAGE_CONTENT = (
        <ImageContent
            content="This is some image content"
        />
    );

    it('renders the content', () => {
        const { container } = render(IMAGE_CONTENT);

        const content = container.getElementsByClassName('image-content-text');

        expect(content).toHaveLength(1);
        expect(content[0]).toHaveTextContent('This is some image content');
    });

    it('renders the background, content, and event listener components with the correct classes', () => {
        render(IMAGE_CONTENT);

        const components = screen.getByTestId('image-content').children;

        expect(components).toHaveLength(3);
        expect(components[0]).toHaveClass(
            'image-tag-overlay-top image-description-overlay background-fadeOut',
        );
        expect(components[1]).toHaveClass('image-tag-overlay-top');
        expect(components[2]).toHaveClass(
            'image-tag-overlay-top image-description-overlay-listener',
        );
    });

    it('renders the content with the correct classes', () => {
        const { container } = render(IMAGE_CONTENT);

        const content = container.getElementsByClassName('image-content-text');

        expect(content[0]).toHaveClass('image-content-text text-fadeOut');
    });

    it('handles the appropriate events on desktop', () => {
        const { container } = render(IMAGE_CONTENT);

        const listener = container.getElementsByClassName('image-description-overlay-listener')[0];

        fireEvent.mouseOver(listener);

        expect(container.getElementsByClassName('background-fadeIn')).toHaveLength(1);
        expect(container.getElementsByClassName('text-fadeIn')).toHaveLength(1);
        expect(container.getElementsByClassName('background-fadeOut')).toHaveLength(0);
        expect(container.getElementsByClassName('text-fadeOut')).toHaveLength(0);

        fireEvent.mouseLeave(listener);

        expect(container.getElementsByClassName('background-fadeIn')).toHaveLength(0);
        expect(container.getElementsByClassName('text-fadeIn')).toHaveLength(0);
        expect(container.getElementsByClassName('background-fadeOut')).toHaveLength(1);
        expect(container.getElementsByClassName('text-fadeOut')).toHaveLength(1);

        fireEvent.click(listener);

        expect(container.getElementsByClassName('background-fadeIn')).toHaveLength(0);
        expect(container.getElementsByClassName('text-fadeIn')).toHaveLength(0);
        expect(container.getElementsByClassName('background-fadeOut')).toHaveLength(1);
        expect(container.getElementsByClassName('text-fadeOut')).toHaveLength(1);
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
            const { container } = render(IMAGE_CONTENT);

            const listener = container.getElementsByClassName('image-description-overlay-listener')[0];

            fireEvent.click(listener);

            expect(container.getElementsByClassName('background-fadeIn')).toHaveLength(1);
            expect(container.getElementsByClassName('text-fadeIn')).toHaveLength(1);
            expect(container.getElementsByClassName('background-fadeOut')).toHaveLength(0);
            expect(container.getElementsByClassName('text-fadeOut')).toHaveLength(0);

            fireEvent.click(listener);

            expect(container.getElementsByClassName('background-fadeIn')).toHaveLength(0);
            expect(container.getElementsByClassName('text-fadeIn')).toHaveLength(0);
            expect(container.getElementsByClassName('background-fadeOut')).toHaveLength(1);
            expect(container.getElementsByClassName('text-fadeOut')).toHaveLength(1);

            fireEvent.mouseOver(listener);

            expect(container.getElementsByClassName('background-fadeIn')).toHaveLength(0);
            expect(container.getElementsByClassName('text-fadeIn')).toHaveLength(0);
            expect(container.getElementsByClassName('background-fadeOut')).toHaveLength(1);
            expect(container.getElementsByClassName('text-fadeOut')).toHaveLength(1);

            fireEvent.mouseLeave(listener);

            expect(container.getElementsByClassName('background-fadeIn')).toHaveLength(0);
            expect(container.getElementsByClassName('text-fadeIn')).toHaveLength(0);
            expect(container.getElementsByClassName('background-fadeOut')).toHaveLength(1);
            expect(container.getElementsByClassName('text-fadeOut')).toHaveLength(1);
        });
    });
});
