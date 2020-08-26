import * as vt from './values';

export { Color, colorDefault } from './values';

export interface CellText {
    readonly type: 'text';
    readonly text: string;
    readonly color?: vt.Color;
}

export interface CellButtonsButton {
    label: string;
    onAction: () => void;
}

export interface CellButtons {
    readonly type: 'buttons';
    readonly buttons: readonly CellButtonsButton[];
}

export type Cell =
    CellText |
    CellButtons;

export interface Row {
    readonly cells: readonly Cell[];
}

export interface ContentData {
    type: 'data';
    rows: readonly Row[];
}

export interface ContentMessage {
    type: 'message';
    textHeader: string;
    textBody: string;
}

export type Content = ContentData | ContentMessage;
    
export interface OuterLayout {
    margin?: vt.TopRightBottomLeft;
    width?: vt.DimensionSize;
    widthGrow?: number;
    height?: vt.DimensionSize;
    heightGrow?: number;
}

export interface InnerLayout {
    padding?: vt.TopRightBottomLeft;
    headerRowHeight?: number;
    headerRowGutter?: number;
    rowHeight?: number;
    rowGutter?: number;
    cellGutter?: number;
}

export interface Column {
    header: string;
    width: number;
    widthMin?: number;
    widthMax?: number;
    widthGrow?: number;
    widthShrink?: number;
    // ---
    alignV?: 'top' | 'middle' | 'bottom' | undefined;

    //
    // cellPadding?: vt.TopRightBottomLeft;
    // cellAlignH: 'left' | 'center' | 'right';
    // cellAlignV: 'top' | 'center' | 'bottom';
}

export interface Table3 {
    type: 'table3';
    readonly outerLayout: OuterLayout;
    readonly innerLayout: InnerLayout;
    readonly columns: readonly Column[];
    readonly content: Content;
}

export const cellText = (text: string, options?: { color?: vt.Color }): CellText => ({
    type: 'text',
    text,
    color: options ? options.color : undefined,
});

export const cellIconAndText = (x: {
    icon: 'cross' | 'clock' | 'tick',
    text: string,
    color?: vt.Color;
    tooltipText?: string;
}): CellText => ({
    type: 'text',
    text: x.text,
    color: x.color,
});

export const cellButtons = (buttons: readonly CellButtonsButton[]): CellButtons =>
    ({ type: 'buttons', buttons });


export const table3 = (x: {
    readonly outerLayout: OuterLayout;
    readonly innerLayout: InnerLayout;
    readonly columns: readonly Column[];
    readonly content: Content;
}): Table3 => ({
    type: 'table3',
    outerLayout: x.outerLayout,
    innerLayout: x.innerLayout,
    columns: x.columns,
    content: x.content,
});

export const table3Data = (x: {
    readonly outerLayout: OuterLayout;
    readonly innerLayout: InnerLayout;
    readonly columns: readonly Column[];
    readonly content: ContentData;
}): Table3 => ({
    type: 'table3',
    outerLayout: x.outerLayout,
    innerLayout: x.innerLayout,
    columns: x.columns,
    content: x.content,
});

export const table3Message = (x: {
    readonly outerLayout: OuterLayout;
    readonly innerLayout: InnerLayout;
    readonly columns: readonly Column[];
    readonly content: ContentMessage;
}): Table3 => ({
    type: 'table3',
    outerLayout: x.outerLayout,
    innerLayout: x.innerLayout,
    columns: x.columns,
    content: x.content,
});
