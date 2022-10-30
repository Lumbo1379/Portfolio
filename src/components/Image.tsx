import { ReactElement } from 'react';
import logger from '../services/logService';
import ImageContent from './ImageContent';
import Tag, { ITagContent } from './Tag';

interface IImageConfig {
    style?: { [key: string]: string }
    tags?: ITagContent[][]
    link?: string
    content?: string
}

export interface IImage {
    src: string
    alt: string
    config?: IImageConfig
}

const renderTags = (tags: ITagContent[], link?: string): ReactElement[] => tags.map((tag, i) => (
    <Tag
        key={i}
        tag={tag}
        link={link}
    />
));

const Image = ({ src, alt, config = {} }: IImage): ReactElement => {
    if (config.tags && config.tags.length > 2) {
        logger.error('Images can contain no more than two tag sets');
    }

    return (
        <div data-testid="image" className="overlay-container" style={config.style ?? {}}>
            <img
                src={src}
                className="img-responsive"
                alt={alt}
            />
            {config.tags && (
                <>
                    {config.tags[0] && (
                        <div className="image-tag-overlay-top">
                            {renderTags(config.tags[0], config.link)}
                        </div>
                    )}
                    {config.tags[1] && (
                        <div className="image-tag-overlay-bottom">
                            {renderTags(config.tags[1])}
                        </div>
                    )}
                </>
            )}
            {config.content && (
                <ImageContent content={config.content} />
            )}
        </div>
    );
};

export default Image;
