import * as muiStyles from '@material-ui/styles';

import * as va from '../../impl/valueAdapters/index';
import * as m from '../../models/table3';
import * as c from '../common';

import { Color as ModelColor } from '../../models/values';

const mapColorRecord: Record<ModelColor, string> = {
    black: '#222222',
    green: 'green',
    red: 'red',
    darkgray: '#555555',
    blue: '#1565C0',
};
export const mapColor = (modelColor: ModelColor = 'black'): string => mapColorRecord[modelColor];


const rowHeaderGutterDefault: number = 8;
const rowHeightDefault: number | undefined = undefined;
const rowGutterDefault: number = 6;
const cellGutterDefault: number = 4;


const contextParentLayoutTypeIsFlexRow = (context?: c.Context): boolean => {
    if (typeof context === 'undefined') {
        return false;
    }
    switch (context.parentLayoutType) {
        case 'flexRow': return true;
        case 'flexRowOneChild': return true;
        default: return false;
    }
}

const contextParentLayoutTypeIsFlexColumn = (context?: c.Context): boolean => {
    if (typeof context === 'undefined') {
        return false;
    }
    switch (context.parentLayoutType) {
        case 'flexColumn': return true;
        case 'flexColumnOneChild': return true;
        default: return false;
    }
}

export const tableStyle = (props: m.Table3, context?: c.Context): React.CSSProperties => {
    const paddingC = va.trblC(props.innerLayout.padding);
    return {
        // Outer layout
        flexGrow: contextParentLayoutTypeIsFlexRow(context) ?
            props.outerLayout.widthGrow :
            contextParentLayoutTypeIsFlexColumn(context) ?
                props.outerLayout.heightGrow :
                undefined,
        ...va.dimSzC(props.outerLayout.width, context).asWidthToCSSDeclarations(),
        ...va.dimSzC(props.outerLayout.height, context).asHeightToCSSDeclarations(),
        // Inner layout
        display: 'flex',
        flexDirection: 'column',
        paddingTop: paddingC.top(),
        paddingBottom: paddingC.bottom(),
        overflowY: 'hidden',
    };
};


export const tbodyStyle = (props: m.Table3, context?: c.Context): React.CSSProperties => {
    return {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        overflowY: 'scroll',
    };
};

export const headerRowStyle = (props: {
    table: m.Table3;
}): React.CSSProperties => {

    const innerLayout = props.table.innerLayout;
    const rowHeaderGutter = innerLayout.headerRowGutter || rowHeaderGutterDefault;
    const paddingC = va.trblC(props.table.innerLayout.padding);

    return {
        paddingLeft: paddingC.left(),
        paddingRight: paddingC.right(),
        flexGrow: 0,
        flexShrink: 0,
            display: 'flex',
        paddingBottom: rowHeaderGutter/2, // @todo: Should this be an input?
        borderBottom: '1px solid #D0D0D0',
    };
}

export const rowStyle = (props: {
    table: m.Table3;
    context?: c.Context;
}, position: 'first' | 'middle' | 'last'): React.CSSProperties => {
    const innerLayout = props.table.innerLayout;
    const rowHeaderGutter = innerLayout.headerRowGutter || rowHeaderGutterDefault;
    const rowHeight = innerLayout.rowHeight || rowHeightDefault;
    const rowGutter = innerLayout.rowGutter || rowGutterDefault;
    const paddingC = va.trblC(props.table.innerLayout.padding);
    return {
        flexGrow: 0,
        flexShrink: 0,
            display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        height: rowHeight,
        // Assume there is margin collapse
        paddingLeft: paddingC.left(),
        paddingRight: paddingC.right(),
        paddingTop: position === 'first' ? (rowHeaderGutter/2) : (rowGutter/2),
        paddingBottom: position === 'last' ? 0 : (rowGutter/2),
        borderTop: position === 'first' ? undefined : '1px solid #D0D0D0',
    };
};

export const columnHeaderCellStyle = (props: {
    table: m.Table3;
    column: m.Column;
    position: 'first' | 'middle' | 'last';
}): React.CSSProperties => {

    const paddingC = va.trblC(props.table.innerLayout.padding);

    const cellGutter = props.table.innerLayout.cellGutter || cellGutterDefault;
    const column = props.column;

    // const widthGrow = column.widthGrow || (column.widthMax ? 1 : 0);
    // const widthShrink = column.widthGrow || (column.widthMin ? 1 : 0);


    const width = column.width || 0;
    const widthMin = column.widthMin || column.width;
    const widthMax = column.widthMax || column.width;
    const widthGrow = column.widthGrow || (column.widthMax ? 1 : 0);
    const widthShrink = column.widthGrow || (column.widthMin ? 1 : 0);

    return {
        marginLeft: props.position === 'first' ? 0 : cellGutter,
        
        padding: 0,
        
        flexBasis: width,
        minWidth: widthMin,
        maxWidth: widthMax,
        flexGrow: widthGrow,
        flexShrink: widthShrink,
        //
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    };
};

export const columnHeaderCellTypographyStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 500,
    color: 'rgb(128, 128, 128)',
};

export const cellCommonStyle = (props: {
    table: m.Table3;
    column: m.Column;
    position: 'first' | 'middle' | 'last';
}): React.CSSProperties => {

    const cellGutter = props.table.innerLayout.cellGutter || cellGutterDefault;
    const column = props.column;

    const width = column.width || 0;
    const widthMin = column.widthMin || column.width;
    const widthMax = column.widthMax || column.width;
    const widthGrow = column.widthGrow || (column.widthMax ? 1 : 0);
    const widthShrink = column.widthGrow || (column.widthMin ? 1 : 0);

    return {

        padding: 0,
        margin: 0,

        marginLeft: props.position === 'first' ? 0 : cellGutter,
        paddingTop: 12,
        paddingBottom: 12,

        flexBasis: width,
        minWidth: widthMin,
        maxWidth: widthMax,
        flexGrow: widthGrow,
        flexShrink: widthShrink,

        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: column.alignV === 'middle' ?
            'center' :
            column.alignV === 'top' ?
                'flex-start' :
                column.alignV === 'bottom' ?
                    'flex-end' :
                    'center',

        wordWrap: 'break-word',

    };

};

const cellButtonsButtonStyles = muiStyles.createStyles({
    root: {
        color: mapColorRecord.blue,
        paddingLeft: 10,
        // marginLeft: -30,
        minWidth: 1,
    },
    label: {
        color: mapColorRecord.blue,
        fontSize: 14,
        textAlign: "left"
    },
});

// export type CellButtonClasses = muiStyles.WithStyles<typeof cellButtonStyles>;
export const cellButtonButtonUseStyles = muiStyles.makeStyles(cellButtonsButtonStyles);

