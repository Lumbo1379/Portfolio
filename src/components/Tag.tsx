import React, { ReactElement } from 'react';

export interface ITagContent {
    description: string,
    colour: string
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
            <a href={link}>
                <div className="tag-text" style={style}>{description}</div>
            </a>
        );
    }

    return <div className="tag-text" style={style}>{description}</div>;
};

export default Tag;
