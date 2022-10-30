import { render, screen } from '@testing-library/react';

import Tag from './Tag';

describe('<Tag />', () => {
    const TAG = (
        <Tag
            tag={{
                description: 'Some tag',
                colour: '#F7A5A1',
            }}
            link="www.somelink.com"
        />
    );

    const LINKLESS_TAG = (
        <Tag
            tag={{
                description: 'Some tag',
                colour: '#F7A5A1',
            }}
        />
    );

    const COLOURLESS_TAG = (
        <Tag
            tag={{
                description: 'Some tag',
            }}
        />
    );

    it('renders a Tag with colour and a link', async () => {
        render(TAG);

        const link = screen.getByRole('link');

        expect(link.getAttribute('href')).toBe('www.somelink.com');

        expect(link.children).toHaveLength(1);
        expect(link.children[0]).toHaveStyle('--tag-colour: #F7A5A1; cursor: pointer;');
        expect(link.children[0]).toHaveTextContent('Some tag');
    });

    it('renders a linkless Tag', async () => {
        const { container } = render(LINKLESS_TAG);

        const link = screen.queryAllByRole('link');
        const tag = container.getElementsByClassName('tag-text');

        expect(link).toHaveLength(0);

        expect(tag).toHaveLength(1);
        expect(tag[0]).toHaveStyle('--tag-colour: #F7A5A1;');
        expect(tag[0]).toHaveTextContent('Some tag');
    });

    it('renders a Tag with the default colour', async () => {
        const { container } = render(COLOURLESS_TAG);

        const tag = container.getElementsByClassName('tag-text');

        expect(tag).toHaveLength(1);
        expect(tag[0]).toHaveStyle('--tag-colour: #F7D5A1;');
    });
});
