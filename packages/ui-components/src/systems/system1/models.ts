import * as React from 'react';
import { ReactElement } from 'react';

import * as vt from './models/values';

import * as table2 from './models/table2';
import * as table3 from './models/table3';

// ---

export * from './models/values';
import {
    ProgressIndicatorModal,
} from './models/progressIndicatorModal';

// ---


// Inline Elements

export interface Text {
    type: 'text';
    text: string;
    options: {
        margin?: vt.TopRightBottomLeft;
        padding?: vt.TopRightBottomLeft;
        tooltips?: string;
        color?: vt.Color;
        colorCSS?: string;
        font?: vt.Font;
        // @todo: fontSize and fontWeight to be moved into `{ ..., fontCSS: { fontSize, fontWeight } }`
        fontSize?: number;
        fontWeight?: number;
        lineHeight?:  'content' | number; // Defaults to 'content'
        width?: vt.DimensionSize;
    };
}

export const text = (text: string, options: Text['options'] = {}): Text =>
    ({ type: 'text', text, options });

export type IconID = 'cross' | 'tick' | 'clock' | 'questionMark';
export interface Icon {
    type: 'icon';
    iconID: IconID;
    options: {

        padding?: vt.TopRightBottomLeft;
        margin?: vt.TopRightBottomLeft;

        width?: vt.DimensionSize; // Defaults to `'content'`
        height?: vt.DimensionSize; // Defaults to `'content'`

        tooltips?: string;
        color?: vt.Color;
        fontSize?: number;
    };
}

export const icon = (iconID: IconID, options: Icon['options'] = {}): Icon =>
    ({ type: 'icon', iconID, options });

// Need an image element

export type InlineElement = Text | Icon | FromReact;
export type InlineElements = readonly InlineElement[];

// ---



// Layout Elements

export interface LinearLayoutSpacer {
    type: 'linearLayoutSpacer';
    options: {
        size?: number;
        grow?: number;
    };
}
export const linearLayoutSpacer = (options: LinearLayoutSpacer['options']): LinearLayoutSpacer =>
    ({ type: 'linearLayoutSpacer', options })

export interface Button {
    type: 'button';
    label: string;
    onAction: () => void;
    options: {
        width?: vt.DimensionSize;
        height?: vt.DimensionSize;
        style?: 'contained' | 'outlined' | 'text'; // Defaults to contained
        color?: vt.Color;
    };
}

export const button = (label: string, onAction: () => void, options: Button['options'] = {}): Button =>
    ({ type: 'button', label, onAction, options });

export interface BigButton {
    type: 'bigButton';
    layout: Layout;
    onAction: () => void;
    options: {
        width?: vt.DimensionSize;
        height?: vt.DimensionSize;
        style?: 'contained' | 'outlined' | 'text'; // Defaults to contained
    };
}
export const bigButton = (
    options: BigButton['options'] = {},
    onAction: () => void,
    layout: Layout,
): BigButton =>
    ({ type: 'bigButton', layout, onAction, options });

export const bigButtonWIE = (
    options: BigButton['options'],
    inlineElements: InlineElements,
    onAction: () => void,
): BigButton =>
    ({ type: 'bigButton', onAction, options, layout: linearLayoutH({}, inlineElements) });
    
// ---



// Layouts and Related
export interface LayoutOptions {
    width?: vt.DimensionSize;
    height?: vt.DimensionSize;
    grow?: number;
    // alignH?: 'left' | 'center' | 'right';
    alignH?: 'left' | 'center' | 'right';
    alignV?: 'top' | 'center' | 'bottom';
    padding?: vt.TopRightBottomLeft;
    margin?: vt.TopRightBottomLeft;
    overflowY?: 'scroll' | 'visible' | 'hidden';
};

// Linear Layouts

const removeNullsFromArray = <T>(array: readonly T[]): Exclude<T, null>[] => {
    const output: Exclude<T, null>[] = [];
    for (const element of array) {
        if (element !== null) {
            // @ts-ignore: The element is now of Exclude<T, null> type
            output.push(element);
        }
    }
    return output;
};

export interface LinearLayoutH {
    type: 'linearLayoutH';
    options: LayoutOptions; // `width` defaults to `'full'`, `height` defaults to `'content'`
    elements: readonly LayoutElement[];
}
export const linearLayoutH = (options: LayoutOptions, elements: readonly (LayoutElement | null)[]): LinearLayoutH =>
    ({ type: 'linearLayoutH', options, elements: removeNullsFromArray(elements) });

export interface LinearLayoutV {
    type: 'linearLayoutV';
    options: LayoutOptions; // `width` defaults to `'content'`, `height` defaults to `'full'`
    elements: readonly LayoutElement[];
}

export const linearLayoutV = (options: LayoutOptions, elements: readonly (LayoutElement | null)[]): LinearLayoutV =>
    ({ type: 'linearLayoutV', options, elements: removeNullsFromArray(elements) });

export type Layout = LinearLayoutH | LinearLayoutV;

// Styled Blocks

export interface WarningBlock {
    type: 'warningBlock';
    layout: Layout;
}

export const warningBlock = (layout: Layout): WarningBlock =>
    ({ type: 'warningBlock', layout });

export interface PaperBlock {
    type: 'paperBlock';
    layout: Layout;
    options: {
        width?: vt.DimensionSize;
        height?: vt.DimensionSize;
        margin?: vt.TopRightBottomLeft;
        padding?: vt.TopRightBottomLeft;
        overflowY?: React.CSSProperties['overflowY'];
    };
}
export const paperBlock = (options: PaperBlock['options'], layout: Layout): PaperBlock =>
    ({ type: 'paperBlock', layout, options });

export interface LayoutFragment {
    type: 'layoutFragment';
    elements: LayoutElements;
}

export const layoutFragment = (elements: LayoutElements): LayoutFragment => ({ type: 'layoutFragment', elements });

export type LayoutElement =
    Layout |
    LinearLayoutSpacer |
    InlineElement |
    Button |
    BigButton |
    WarningBlock |
    PaperBlock |
    FormInputText |
    FormInputDropdown<any> |
    Table1<any, any> |
    table2.Table2<any, any> |
    table3.Table3 |
    Rectangle |
    FromReact |
    ModalPopup |
    LayoutFragment |
    ProgressIndicatorModal;

export type LayoutElements = readonly LayoutElement[];

// ---



// Modals

export interface ModalPopup {
    type: 'modalPopup';
    open: boolean;
    layout: Layout;
    options: {
        width?: 'content' | number;
        height?: 'content' | number;
        margin?: vt.TopRightBottomLeft;
        padding?: vt.TopRightBottomLeft;
    };
}
export const modalPopup = (open: boolean, options: ModalPopup['options'], layout: Layout): ModalPopup =>
    ({ type: 'modalPopup', open, layout, options });

// ---



// Escape from the model

export interface FromReact {
    type: 'fromReact';
    reactElement: ReactElement;
}
export const fromReact = (reactElement: ReactElement): FromReact =>
    ({ type: 'fromReact', reactElement });


// ---



// Form Inputs

export interface FormInputText {
    type: 'formInputText';
    label: string;
    value: string;
    onUpdate: (value: string) => void;
    options: {
        endAdornment?: string;
        width?: vt.DimensionSize; // Defaults to `'full'`
        height?: vt.DimensionSize; // Defaults to `'content'`
    };
}
export const formInputText = (x: {
    label: string;
    value: string;
    onUpdate: (value: string) => void;
    options?: FormInputText['options'];
}): FormInputText =>
    ({
        type: 'formInputText',
        label: x.label,
        value: x.value,
        onUpdate: x.onUpdate,
        options: x.options || {},
    });

export interface FormInputDropdown<Value> {
    type: 'formInputDropdown';
    label: string;
    value: Value;
    onUpdate: (value: Value) => void;
    valueOptions: readonly { value: Value, label: string }[];
    options: {
        width?: vt.DimensionSize; // Defaults to `'full'`
        height?: vt.DimensionSize; // Defaults to `'content'`
    };
}
export const formInputDropwdown = <Value>(
    label: string,
    value: Value,
    onUpdate: (value: Value) => void,
    dropdownOptions: readonly { value: Value, label: string }[],
    options: FormInputDropdown<Value>['options'],
): FormInputDropdown<Value> =>
    ({
        type: 'formInputDropdown',
        label,
        value,
        onUpdate,
        valueOptions: dropdownOptions,
        options,
    });

export interface FormInputDropdown<Value> {
    type: 'formInputDropdown';
    label: string;
    value: Value;
    onUpdate: (value: Value) => void;
    valueOptions: readonly { value: Value, label: string }[];
    options: {
        width?: vt.DimensionSize; // Defaults to `'full'`
        height?: vt.DimensionSize; // Defaults to `'content'`
    };
}

// Table1

export type Table1CellText = Readonly<{
    type: 'text';
    text: string;
    color?: vt.Color;
    isFirst?: boolean;
}>;

export type Table1CellIconAndText = Readonly<{
    type: 'iconAndText';
    iconID: IconID;
    text: string;
    color?: vt.Color;
    tooltipText?: string;
    isFirst?: boolean;
}>;

export type Table1CellButton<RowID, RowAction> = Readonly<{
    type: 'buttons';
    rowID: RowID;
    buttons: readonly {
        // @todo: Should buttons support tooltips?
        label: string;
        rowAction: RowAction;
    }[];
}>;
export type Table1CellButtonWithAction<RowID, RowAction> = Table1CellButton<RowID, RowAction> & { onAction: (rowID: RowID, rowAction: RowAction) => void };

export type Table1Cell<RowID, RowAction> = Table1CellText | Table1CellIconAndText | Table1CellButton<RowID, RowAction>;

// ---

export type Table1Row<RowID, RowAction> = Readonly<{
    // rowID: RowID;
    cells: readonly Table1Cell<RowID, RowAction>[];
}>;

// ---

export type Table1OnAction<RowID, RowAction> =
    (rowID: RowID, rowAction: RowAction) => void;

export interface Table1Options {
    width?: vt.DimensionSize; // Defaults to `'full'`
    widthGrow?: number;
    height?: vt.DimensionSize; // Defaults to `'content'`
    heightGrow?: number;
    margin?: vt.TopRightBottomLeft;
    padding?: vt.TopRightBottomLeft;
    cellPadding?: vt.TopRightBottomLeft;
    extendLeftRowLine?: number;
    extendRightRowLine?: number;
}

export type Table1Data<RowID, RowAction> = Readonly<{
    type: 'table1';
    subType: 'data';
    columnHeaders: string[];
    data: {
        rows: readonly Table1Row<RowID, RowAction>[];
        onAction: (rowID: RowID, rowAction: RowAction) => void;
    };
    options: Table1Options;
}>;
export type Table1<RowID, RowAction> = Table1Data<RowID, RowAction> | Readonly<{
    type: 'table1';
    subType: 'message';
    columnHeaders: string[];
    message: {
        iconSrc?: string;
        largeText?: string;
        smallText?: string;
    };
    options:Table1Options;
}>;

export const table1Data = <RowID, RowAction>(
    columnHeaders: string[],
    rows: readonly Table1Row<RowID, RowAction>[],
    onAction: (rowID: RowID, rowAction: RowAction) => void,
    options?: {
        width?: vt.DimensionSize; // Defaults to `'full'`
        height?: vt.DimensionSize; // Defaults to `'content'`
    },
): Table1<RowID, RowAction> => ({
    type: 'table1',
    subType: 'data',
    columnHeaders,
    data: {
        rows,
        onAction,
    },
    options: options || {},
});

export const table1Message = <RowID, RowAction>(
    columnHeaders: string[],
    message: {
        iconSrc?: string;
        largeText?: string;
        smallText?: string;
    },
    options?: {
        width?: vt.DimensionSize; // Defaults to `'full'`
        height?: vt.DimensionSize; // Defaults to `'content'`
    },
): Table1<RowID, RowAction> => ({
    type: 'table1',
    subType: 'message',
    columnHeaders,
    message,
    options: options || {},
});

export {
    CellText as Table2CellText,
    Cell as Table2Cell,
    Row as Table2Row,
    OnAction as Table2OnAction,
    Table2Common,
    Table2Data,
    Table2Message,
    Table2,
    cellText as table2CellText,
    table2Data,
    table2Message,
} from './models/table2';

export {
    CellText as Table3CellText,
    CellButtonsButton as Table3CellButtonsButton,
    CellButtons as Table3CellButtons,
    Cell as Table3Cell,
    Row as Table3Row,
    Column as Table3Column,
    ContentData as Table3ContentData,
    ContentMessage as Table3ContentMessage,
    Content as Table3Content,
    InnerLayout as Table3InnerLayout,
    OuterLayout as Table3OuterLayout,
    Table3,
    table3Data,
    table3Message,
    cellText as table3CellText,
    cellIconAndText as table3CellIconAndText,
    cellButtons as table3CellButtons,
} from './models/table3';

// -- Rect

export interface Rectangle {
    type: 'rectangle';
    width: number | 'full';
    height: number | 'full';
    color: string;
    options: {
        margin?: vt.TopRightBottomLeft;
    };
}

export const rectangle = (width: number | 'full', height: number | 'full', color: string, options: Rectangle['options'] = {}): Rectangle =>
    ({
        type: 'rectangle',
        width,
        height,
        color,
        options,
    });
