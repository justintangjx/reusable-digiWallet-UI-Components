import * as vt from './values';

export { Color, colorDefault } from './values';

export type CellText = Readonly<{
    type: 'text';
    text: string;
    color?: vt.Color;
}>;

export type Cell<RowID, RowAction> =
    CellText;

export type Row<RowID, RowActn> = Readonly<{
    cells: readonly Cell<RowID, RowActn>[];
}>;

export type OnAction<RowID, RowAction> =
    (rowID: RowID, rowAction: RowAction) => void;

export interface Table2Common {
    columnHeaders: readonly string[];
    options: {
        margin?: vt.TopRightBottomLeft;
        padding?: vt.TopRightBottomLeft;
        width?: vt.DimensionSize;
        widthGrow?: number;
        height?: vt.DimensionSize;
        heightGrow?: number;
        cellMargin?: vt.TopRightBottomLeft;
        cellPadding?: vt.TopRightBottomLeft;
    };
}

export interface Table2Data<RowID, RowAction> {
    type: 'table2';
    type2: 'data';
    rows: readonly Row<RowID, RowAction>[];
    onAction: OnAction<RowID, RowAction>;
}
    
export interface Table2Message {
    type: 'table2';
    type2: 'message';
    textHeader: string;
    textBody: string;
}

export type Table2<RowID, RowAction> = Table2Common & (
    Table2Data<RowID, RowAction> |
    Table2Message
);

export const cellText = (text: string, options?: { color?: vt.Color }): CellText => ({
    type: 'text',
    text,
    color: options ? options.color : undefined,
});

export const table2Data = <RowID, RowAction>(x: {
    columnHeaders: readonly string[];
    rows: Table2Data<RowID, RowAction>['rows'];
    onAction: Table2Data<RowID, RowAction>['onAction'];
    options?: Table2Common['options'];
}): Table2Common & Table2Data<RowID, RowAction> => ({
    type: 'table2',
    type2: 'data',
    columnHeaders: x.columnHeaders,
    rows: x.rows,
    onAction: x.onAction,
    options: x.options || {},
});

export const table2Message = (x: {
    columnHeaders: readonly string [],
    textHeader: string,
    textBody: string,
    options?: Table2Common['options'],
}): Table2Common & Table2Message =>
    ({
        type: 'table2',
        type2: 'message',
        columnHeaders: x.columnHeaders,
        textHeader: x.textHeader,
        textBody: x.textBody,
        options: x.options || {},
    });
