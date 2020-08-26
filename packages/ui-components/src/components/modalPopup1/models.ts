export type Color = 'black' |  'green' | 'red';
export const colorDefault: Color = 'black';

export type Icon = 'cross' | 'tick' | 'clock';

// ---

export interface SpacerProps {
    type: 'spacer';
    size?: number;
    grow?: number;
}

// ---

export interface TextProps {
    type: 'text';
    text: string;
    color?: Color;
    lineHeight?: number;
}

// ---

export interface HeaderTextProps {
    type: 'headerText';
    text: string;
    color?: Color;
    lineHeight?: number;
}

// ---

export interface EmphasisTextProps {
    type: 'emphasisText';
    text: string;
    color?: Color;
    lineHeight?: number;
}

// ---

export interface TextWithTooltipsProps {
    type: 'textWithTooltips';
    phrases: readonly { text: string, tooltip?: string }[];
}

export interface WarningTextProps {
    type: 'warningText';
    phrases: readonly { text: string }[];
}


// ---

export interface FieldValueTextProps {
    type: 'text';
    text: string;
    color?: Color;
    lineHeight?: number;
}

export interface FieldValueIconAndTextProps {
    type: 'iconAndText';
    icon: Icon;
    text: string;
    tooltip?: string;
    color?: Color;
    lineHeight?: number;
}

export type FieldValueProps = FieldValueTextProps | FieldValueIconAndTextProps;

export interface FieldProps {
    label: string;
    value: FieldValueProps;
}

export interface FieldsProps {
    type: 'fields';
    fields: readonly FieldProps[];
    labelWidth?: number;
    fieldToFieldSpacing: number;
    labelToValueSpacing: number;
}

// ---

export interface FormInputTextProps {
    type: 'text';
    label: string;
    placeholder?: string;
    value: string;
    onUpdate: (value: string) => void;
    width?: number;
}

export interface FormInputDropdownProps<Value> {
    type: 'dropdown';
    label: string;
    options: readonly { value: Value, label: string }[];
    value: Value;
    onUpdate: (value: Value) => void;
    width?: number;
}

export type FormInputProps =
    FormInputTextProps |
    FormInputDropdownProps<any>;

export interface FormInputsProps  {
    type: 'formInputs';
    elements: readonly FormInputProps[];
    fieldInputToFieldInputSpacing: number;
}

// ---

export interface ActionBarElementSpacer {
    type: 'spacer';
    size?: number;
    grow?: number;
}

export interface ActionBarElementButton {
    type: 'button';
    buttonType: 'primary' | 'secondary';
    label: string;
    autofocus?: boolean;
    onAction: () => void;
}

export type ActionBarElement =
    ActionBarElementSpacer |
    ActionBarElementButton;

export interface ActionBarProps {
    type: 'actionBar';
    elements: readonly ActionBarElement[];
}

/**
 * This is the ID function that does nothing, but is used to hint and enforce generic types in TypeScript.
 * @param x 
 */
// export const actionBarProps = <ActionID>(x: ActionBarProps<ActionID>) => x;

// ---

export type ElementPropsDict = {
    spacer: SpacerProps;
    text: TextProps;
    headerText: HeaderTextProps;
    emphasisText: EmphasisTextProps;
    // field: FieldProps;
    fields: FieldsProps;
    formInputs: FormInputsProps;
    actionBar: ActionBarProps;
};

(x: keyof ElementPropsDict): ElementPropsDict[keyof ElementPropsDict]['type'] => x;

export type ElementProps = ElementPropsDict[keyof ElementPropsDict];

export interface ModalPopup1Props {
    open: boolean;
    width?: number;
    height?: number;
    padding?: number;
    elements: readonly ElementProps[];
}
