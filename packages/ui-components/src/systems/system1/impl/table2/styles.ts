import * as vt from '../../models/values';
import * as vta from '../valueAdapters/index';
import * as c from '../common';

import { Color as ModelColor } from '../../models/values';


const mapColorRecord: Record<ModelColor, string> = {
    black: '#222222',
    green: 'green',
    red: 'red',
    darkgray: '#555555',
    blue: 'blue',
};
export const mapColor = (modelColor: ModelColor = 'black'): string => mapColorRecord[modelColor];

export const outer = (x: {
    margin?: vt.TopRightBottomLeft;
    padding?: vt.TopRightBottomLeft;
    width?: vt.DimensionSize;
    widthGrow?: number;
    height?: vt.DimensionSize;
    heightGrow?: number;
}, context?: c.Context): React.CSSProperties => {
    const margin = vta.trblC(x.margin).toCSSValue();
    const padding = vta.trblC(x.padding).toCSSValue();
    const width = vta.dimSzC(x.width, context).asWidthToCSSDeclarations();
    const grow = typeof context === 'undefined' ? undefined :
        context.parentLayoutType === 'flexColumn' ?
            x.heightGrow :
            context.parentLayoutType === 'flexRow' ?
                x.widthGrow :
                    undefined;
    return {
        margin,
        padding,
        ...width,
        height: x.height,
        flexGrow: grow,
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'flex-start',
        alignItems: 'stretch',
    };
};

export const message: React.CSSProperties = {
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
};

export const thead: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    alignItems: 'stretch',
};

export const tbody: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    alignItems: 'stretch',
    overflowY: 'scroll',
};

export const row: React.CSSProperties = {
    display: 'flex',
    flexGrow: 0,
    flexShrink: 0,
    // justifyContent: 'flex-start',
    alignItems: 'stretch',
};

export const cellHeader = (x: {
    margin?: vt.TopRightBottomLeft;
    padding?: vt.TopRightBottomLeft;
}): React.CSSProperties => {
    const margin = vta.trblC(x.margin).toCSSValue();
    const padding = vta.trblC(x.padding).toCSSValue();
    return {
        margin,
        padding,
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 0,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: 14,
        fontWeight: 500,
        color: 'rgba(0,0,0,0.5)',
        // padding: props.options.cellPadding ? h.formatTopRightBottomLeft(props.options.cellPadding) : undefined,
    };
};

export const cellText = (x: {
    margin?: vt.TopRightBottomLeft;
    padding?: vt.TopRightBottomLeft;
}): React.CSSProperties => {
    const margin = vta.trblC(x.margin).toCSSValue();
    const padding = vta.trblC(x.padding).toCSSValue();
    return {
        margin,
        padding,
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 0,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: 14,
        // padding: props.options.cellPadding ? h.formatTopRightBottomLeft(props.options.cellPadding) : undefined,
    };
};