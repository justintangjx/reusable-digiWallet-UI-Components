// Value Types

export {
    Color,
    colorDefault,
    colorMapToCSSColor,
} from './color';

export {
    Font,
    FontCSSProperties,
    fontCSSMap,
} from './font';

export type TopRightBottomLeft = number | [number, number] | [number, number, number, number]; // all | [vertical, horizontal] | [top, right, bottom, left]

export type DimensionSize = 'full' | 'content' | number;
