import * as vt from '../models/values';

export const formatTopRightBottomLeft = (topRightBottomLeft: vt.TopRightBottomLeft): number | string => {
    if (typeof topRightBottomLeft === 'number') {
        return topRightBottomLeft;
    } else {
        return topRightBottomLeft.map(x => x.toString()+'px').join(' ');
    }
};

export const formatLeftRight = (leftRight: number | [number, number]): number | string => {
    if (typeof leftRight === 'number') {
        return leftRight;
    } else {
        return leftRight.map(x => x.toString()+'px').join(' ');
    }
};
