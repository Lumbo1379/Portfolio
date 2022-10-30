import { render, screen } from '@testing-library/react';

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
                ]],
                link: 'www.somelink.com',
                content: 'Some content',
                style: {
                    '--someStyleProp': 'true',
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
        render(IMAGE);

        const img = screen.getByRole('img');

        expect(img).toHaveProperty('alt', 'Tanks');
        expect(img).toHaveProperty('src', 'http://localhost/tanks.gif');
    });

    it('renders three Tags, including a link and some content', () => {
        render(IMAGE);

        const tags = screen.getAllByTestId('tag');
        const content = screen.getAllByTestId('image-content');

        expect(tags).toHaveLength(3);
        expect(tags[0].getElementsByTagName('a')).toHaveLength(1);

        expect(content).toHaveLength(1);
        expect(content[0].getElementsByTagName('p')[0]).toHaveTextContent('Some content');
    });

    it('renders three Tags inside appropriate containers', () => {
        render(IMAGE);

        const tags = screen.getAllByTestId('tag');

        expect(tags[0].parentElement).toHaveClass('image-tag-overlay-top');
        expect(tags[1].parentElement).toHaveClass('image-tag-overlay-bottom');
        expect(tags[2].parentElement).toHaveClass('image-tag-overlay-bottom');
    });

    it('renders no tags when there are no tags', () => {
        render(SIMPLE_IMAGE);

        const tags = screen.queryAllByTestId('tag');

        expect(tags).toHaveLength(0);
    });

    it('does not render an ImageContent when there is no content', () => {
        render(SIMPLE_IMAGE);

        const imageContent = screen.queryAllByTestId('image-content');

        expect(imageContent).toHaveLength(0);
    });

    it('renders a container with additional styles', () => {
        const { container } = render(IMAGE);

        const overlayContainer = container.getElementsByClassName('overlay-container');

        expect(overlayContainer).toHaveLength(1);
        expect(overlayContainer[0].getAttribute('style')).toBe('--someStyleProp: true;');
    });

    it('renders a container without additional styles', () => {
        const { container } = render(SIMPLE_IMAGE);

        const overlayContainer = container.getElementsByClassName('overlay-container');

        expect(overlayContainer).toHaveLength(1);
        expect(overlayContainer[0].getAttribute('style')).toBeNull();
    });

    it('renders an img with the correct classes', () => {
        render(IMAGE);

        const img = screen.getByRole('img');

        expect(img.className).toBe('img-responsive');
    });
});
