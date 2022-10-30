import React, { ReactElement } from 'react';
import Image, { IImage } from './Image';
import getHeightAndWidth from '../utils';

type FormattedGridLayout = { [key: number]: { [key: string]: string } };
type UnFormattedGridLayout = { [key: number]: [
    number,
    number,
    number,
    number
]};

interface ICollage {
    images: IImage[]
    layout: number[][]
}

const formatGridLayout = (layout: UnFormattedGridLayout): FormattedGridLayout => {
    const formattedGridLayout: FormattedGridLayout = {};

    for (const imageId in layout) {
        const [
            minRow,
            minCol,
            maxRow,
            maxCol,
        ] = layout[imageId];

        formattedGridLayout[imageId] = {
            gridColumn: `${minCol + 1} / ${maxCol + 2}`,
            gridRow: `${minRow + 1} / ${maxRow + 2}`,
        };
    }

    return formattedGridLayout;
};

const getRowsAndColumns = (layout: number[][]): FormattedGridLayout => {
    const [height, width] = getHeightAndWidth(layout);

    const unFormattedGridLayout: UnFormattedGridLayout = {};

    for (let row = 0; row < height; row++) {
        for (let column = 0; column < width; column++) {
            const imageId = layout[row][column];

            if (imageId in unFormattedGridLayout) {
                const [
                    minRow,
                    minCol,
                    maxRow,
                    maxCol,
                ] = unFormattedGridLayout[imageId];

                unFormattedGridLayout[imageId] = [
                    Math.min(row, minRow),
                    Math.min(column, minCol),
                    Math.max(row, maxRow),
                    Math.max(column, maxCol),
                ];
            } else {
                unFormattedGridLayout[imageId] = [row, column, row, column];
            }
        }
    }

    return formatGridLayout(unFormattedGridLayout);
};

const Collage = ({ images, layout }: ICollage): ReactElement => {
    const gridPositions = getRowsAndColumns(layout);
    const [height, width] = getHeightAndWidth(layout);

    const gridStyle = { '--grid-rows': height, '--grid-columns': width } as React.CSSProperties;

    return (
        <div data-testid="collage" className="custom-grid custom-margin" style={gridStyle}>
            {images.map((image, i) => (
                <Image
                    key={i}
                    src={image.src}
                    alt={image.alt}
                    config={{
                        style: gridPositions[i],
                        ...image.config,
                    }}
                />
            ))}
        </div>
    );
};

export default Collage;
