export type Color = 'black' | 'red' | 'green';

export type Icon = 'cross' | 'clock' | 'tick';

// ---

export interface ActionProps<RowID, RowAction> {
    onAction: (rowID: RowID, rowAction: RowAction) => void;
}

export type CellPropsText = Readonly<{
    type: 'text';
    text: string;
    color?: Color;
    isFirst?: boolean;
}>;

export type CellPropsIconAndText = Readonly<{
    type: 'iconAndText';
    icon: Icon;
    text: string;
    color?: Color;
    tooltipText?: string;
    isFirst?: boolean;
}>;

export type CellPropsButton<RowID, RowAction> = Readonly<{
    type: 'buttons';
    rowID: RowID;
    buttons: readonly {
        // @todo: Should buttons support tooltips?
        label: string;
        rowAction: RowAction;
    }[];
}>;
export type CellPropsButtonWithAction<RowID, RowAction> = CellPropsButton<RowID, RowAction> & { onAction: (rowID: RowID, rowAction: RowAction) => void };

export type CellProps<RowID, RowAction> = CellPropsText | CellPropsIconAndText | CellPropsButton<RowID, RowAction>;

// ---

export type RowProps<RowID, RowAction> = Readonly<{
    // rowID: RowID;
    cells: readonly CellProps<RowID, RowAction>[];
}>;

// ---

export type Table1Props<RowID, RowAction> = Readonly<{
    columnHeaders: string[];
    rows: readonly RowProps<RowID, RowAction>[];
    onAction: (rowID: RowID, rowAction: RowAction) => void;
}>;
