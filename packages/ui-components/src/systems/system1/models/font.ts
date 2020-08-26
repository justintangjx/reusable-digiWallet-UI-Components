export interface FontCSSProperties {
    fontSize?: number;
    fontWeight?: number;
}

export type Font =
    'big' |
    'small';

export const fontCSSMap: Record<Font, FontCSSProperties> = {
    big: {},
    small: {},
};

