import * as svgs from './svgs';

// ---

import { Classes } from './styles';

// ---

export type ColorID = 'red' | 'black-first-cell-in-row' | 'black';
export const colorIDToClassName = (classes: Classes['classes'], colorID: ColorID): string => {
    switch (colorID) {
        case 'red': return classes.cellRedTextStyle;
        case 'black-first-cell-in-row': return classes.firstCellBlackTextStyle;
        case 'black': return classes.cellBlackTextStyle;
    }
}

export type IconID = 'x' | 'clock' | 'tick';
export const iconIDToSrc: Record<IconID, string> = {
    'x': svgs.xIcon,
    'tick': svgs.tickIcon,
    'clock': svgs.clockIcon,
};

// ---

export type TopBarProps = Readonly<{
    tableTitle: string;
    toolTipMsg?: string;
    onOrderStatusInfoPopup?: () => void;
    // @todo: This should be removed since it is not used in phase1?
    onSearch?: () => void;
}>;

// ---

export type CellPropsText = Readonly<{
    type: 'text';
    color: ColorID;
    text: string;
}>;

export type CellPropsIconAndText = Readonly<{
    type: 'iconAndText';
    color: ColorID;
    iconID: IconID;
    text: string;
    tooltipText?: string;
}>;

export type CellPropsButton<ButtonID> = Readonly<{
    type: 'buttons';
    rowID: string;
    onClick: (rowID: string, buttonID: ButtonID) => void;
    buttons: readonly {
        // @todo: Should buttons support tooltips?
        buttonID: ButtonID;
        label: string;
    }[];
}>;

export type CellProps<ButtonID> = CellPropsText | CellPropsIconAndText | CellPropsButton<ButtonID>;

// ---

export type RowProps<ButtonID> = Readonly<{
    rowID: string;
    cells: readonly CellProps<ButtonID>[];
}>;

// ---

export type BodyPropsError = Readonly<{
    type: 'error';
    message: string;
}>;

export type BodyPropsData<ButtonID> = Readonly<{
    type: 'data';
    rows: readonly RowProps<ButtonID>[];
}>;

export type BodyProps<ButtonID> = Readonly<
    { type: 'loading'; } |
    BodyPropsData<ButtonID> |
    BodyPropsError
>;

// ---

export type TableProps<ButtonID> = Readonly<{
    topBar: TopBarProps;
    columnHeaders: string[];
    body: BodyProps<ButtonID>;
}>;

