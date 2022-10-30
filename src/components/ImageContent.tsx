import { ReactElement, useState } from 'react';
import { isMobile } from 'react-device-detect';

interface IImageContent {
    content: string
}

const ImageContent = ({ content }: IImageContent): ReactElement => {
    const [show, setShow] = useState<boolean>(false);

    const handleOnClick = (): void => {
        setShow(!show);
    };

    const handleOnHover = (left: boolean): void => {
        // On first click, mobiles raise onMouseOver
        if (!isMobile) {
            setShow(!left);
        }
    };

    const fadeClass = show ? 'fadeIn' : 'fadeOut';
    const backgroundClasses = `image-tag-overlay-top image-description-overlay background-${fadeClass}`;
    const textClass = `image-content-text text-${fadeClass}`;

    return (
        <div data-testid="image-content">
            <div className={backgroundClasses} />
            <div className="image-tag-overlay-top">
                <p className={textClass}>
                    {content}
                </p>
            </div>
            <div
                className="image-tag-overlay-top image-description-overlay-listener"
                onClick={() => { if (isMobile) handleOnClick(); }}
                onMouseLeave={() => handleOnHover(true)}
                onMouseOver={() => handleOnHover(false)}
            />
        </div>
    );
};

export default ImageContent;
