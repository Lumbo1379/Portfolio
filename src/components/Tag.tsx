import { ReactElement, CSSProperties } from 'react';

export interface ITagContent {
    description: string,
    colour?: string
}

interface ITag {
    tag: ITagContent,
    link?: string
}

interface ITagText {
    description: string,
    style: CSSProperties,
    link?: string
}

const getStyle = (hasLink: boolean, colour?: string): CSSProperties => {
    const style = { '--tag-colour': colour || '#F7D5A1' } as CSSProperties;

    if (hasLink) {
        style.cursor = 'pointer';
    }

    return style;
};

const getTagText = ({ description, style, link }: ITagText): ReactElement => {
    const text = <div className="tag-text" style={style}>{description}</div>;

    if (link) {
        return (
            <a href={link}>
                {text}
            </a>
        );
    }

    return text;
};

const Tag = ({ tag, link }: ITag): ReactElement => {
    const { colour, description }: ITagContent = tag;

    const style = getStyle(link !== undefined && link !== '', colour);

    return (
        <div data-testid="tag">
            {getTagText({ description, style, link })}
        </div>
    );
};

export default Tag;
