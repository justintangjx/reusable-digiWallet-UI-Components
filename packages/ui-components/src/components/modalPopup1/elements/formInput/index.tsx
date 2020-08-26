import {
    default as React,
    ReactElement,
    ReactNode,
} from "react";

import {
    TextField,
    MenuItem,
    InputAdornment,
} from "@material-ui/core";

// ---

import {
    FormInputDropdownProps,
    FormInputTextProps,
    FormInputProps,
    FormInputsProps,
} from '../../models';

import { useStyles, Classes } from './styles';

// ---

const DefaultTextField = (
    props: FormInputTextProps,
): ReactElement => {
    return (
        <TextField
            label={props.label}
            placeholder={props.placeholder}
            style={{
                display: 'block',
                margin: 0,
                padding: 0,
                // height: 56,
                width: props.width === undefined ? 382 : props.width + 30,
            }}
            fullWidth={true}
            value={props.value}
            required={true}
            onChange={(event) => props.onUpdate(event.target.value)}
            InputProps={{ endAdornment: (<InputAdornment position="end">{props.placeholder}</InputAdornment>) }}
            margin="normal"
            variant="filled"
        />
    );
};

const DefaultDropDownTextField = <Value extends string = string>(
    props: FormInputDropdownProps<Value> & Classes,
): ReactElement => {
    return (
        <TextField
            select
            label={props.label}
            value={props.value}
            // @ts-unsafe
            onChange={(event) => props.onUpdate(event.target.value as Value)}
            className={props.classes.dropDownMenu}
            fullWidth={true}
            style={{
                display: 'block',
                margin: 0,
                width: props.width === undefined ? 390 : props.width + 42,
            }}
            SelectProps={{
                MenuProps: {
                    className: props.classes.dropDownMenu,
                }
            }}
            required={true}
            margin="normal"
            variant="filled"
        >
            {props.options.map(option => (
                <MenuItem
                    key={option.value}
                    value={option.value }
                    style={{
                        width: props.width === undefined ? 390 : props.width + 10,
                    }}
                >
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

const FormInput = (props: FormInputProps & Classes): ReactElement => {
    switch (props.type) {
        case 'text': return (<DefaultTextField {...props} />);
        case 'dropdown': return (<DefaultDropDownTextField {...props} />);
    }
};

export const FormInputs = (props: FormInputsProps): ReactElement => {
    const classes = useStyles();
    return (<>
        {props.elements.map((fieldInputProps, index) => (
            <React.Fragment key={index}>
                {index > 0 ? (<div style={{ height: props.fieldInputToFieldInputSpacing }} />) : null}
                <FormInput {...fieldInputProps} classes={classes} />
            </React.Fragment>
        ))}
    </>);
};
