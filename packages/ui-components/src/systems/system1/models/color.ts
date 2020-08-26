export type Color =
    'black' |
    'green' |
    'red' |
    'darkgray' |
    'blue';

export const colorDefault: Color = 'black';

export const colorMapToCSSColor: Record<Color, string> = {
    black: '#222222',
    green: 'green',
    blue: 'blue',
    darkgray: 'darkgray',
    red: 'red',
};
