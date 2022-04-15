import { ReactElement } from 'react';

interface IImage {
    src: string
    alt: string
    style?: { [key: string]: string }
}

const Image = ({ src, alt, style = {} }: IImage): ReactElement => (
    <img
        src={src}
        className="img-responsive"
        alt={alt}
        style={style}
    />
);

export default Image;
