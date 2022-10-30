import React, { ReactElement } from 'react';

export interface ITagContent {
    description: string,
    colour?: string
}

interface ITag {
    tag: ITagContent,
    link?: string
}

const Tag = ({ tag, link }: ITag): ReactElement => {
    const { colour, description }: ITagContent = tag;

    const style = { '--tag-colour': colour || '#F7D5A1' } as React.CSSProperties;

    if (link) {
        style.cursor = 'pointer';

        return (
            <div data-testid="tag">
                <a href={link}>
                    <div className="tag-text" style={style}>{description}</div>
                </a>
            </div>
        );
    }

    return (
        <div data-testid="tag">
            <div className="tag-text" style={style}>{description}</div>
        </div>
    );
};

export default Tag;
