import { render, screen } from '@testing-library/react';

import Headline from './Headline';

describe('<Headline />', () => {
    const HEADLINE = (
        <Headline
            content="This is my headline"
            keywords={{ is: '#FF0000', headline: '#0000FF' }}
        />
    );

    it('renders two <span> for the two keywords', () => {
        const { container } = render(HEADLINE);

        const keywords = container.getElementsByTagName('span');

        expect(keywords).toHaveLength(2);
        expect(keywords[0]).toHaveStyle('background: #FF0000');
        expect(keywords[1]).toHaveStyle('background: #0000FF');
    });

    it('renders a h1 with the correct classes', () => {
        render(HEADLINE);

        const h1 = screen.getByRole('heading');

        expect(h1).toHaveClass('display-1');
    });

    it('displays the content', () => {
        render(HEADLINE);

        const h1 = screen.getByRole('heading');

        expect(h1).toHaveTextContent('This is my headline');
    });

    it('displays the content without passing keywords', () => {
        const { container } = render(<Headline content="This is my headline" />);

        const keywords = container.getElementsByTagName('span');
        const h1 = screen.getByRole('heading');

        expect(keywords).toHaveLength(0);
        expect(h1).toHaveTextContent('This is my headline');
    });
});
