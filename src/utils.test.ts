import getHeightAndWidth from './utils';

describe('utils', () => {
    it('getHeightAndWidth returns the length and height of a 2d array', () => {
        const array2D = [
            [0, 1],
            [2, 3],
            [4, 5, 6, 7],
        ];

        const [height, width] = getHeightAndWidth(array2D);

        expect(height).toBe(3);
        expect(width).toBe(2); // Assumes 2d array is not jagged
    });
});
