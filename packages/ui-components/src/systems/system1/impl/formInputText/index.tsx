import * as React from 'react';

import { TextField, InputAdornment } from '@material-ui/core';

import * as m from '../../models';
import * as s from './styles';

// ---

export const FormInputText = (
    props: m.FormInputText,
): React.ReactElement => {
    const classes = s.useStyles();
    return (
        <TextField
            label={props.label}
            placeholder={props.options.endAdornment}
            classes={{
                root: classes.root,
            }}
            style={{
                display: 'block',
                margin: 0,
                width: props.options.width, // @todo: Height and width don't quite work
            }}
            fullWidth={true}
            value={props.value}
            required={true}
            onChange={(event) => props.onUpdate(event.target.value)}
            InputProps={{ endAdornment: props.options.endAdornment !== undefined && (<InputAdornment position="end">{props.options.endAdornment}</InputAdornment>) }}
            margin="normal"
            variant="filled"
        />
    );
};