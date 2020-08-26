import * as React from 'react';

import { TextField, MenuItem } from '@material-ui/core';

import * as m from '../../models';
import * as h from '../helpers';

export const FormInputDropdown = <Value extends string = string>(
    props: m.FormInputDropdown<Value>,
): React.ReactElement => {
    return (
        <TextField
            select
            label={props.label}
            value={props.value}
            // @ts-unsafe
            onChange={(event) => props.onUpdate(event.target.value as Value)}
            fullWidth={props.options.width === 'full'}
            style={{
                display: 'block',
                margin: 0, // @todo: Doesn't quite work
                width: props.options.width,
                height: props.options.height,
                boxSizing: 'content-box', // @todo: This shouldn't be necessary if no forced inheritance
            }}
            required={true}
            margin="normal"
            variant="filled"
        >
            {props.valueOptions.map(option => (
                <MenuItem
                    key={option.value}
                    value={option.value }
                    style={{
                        width: props.options.width,
                    }}
                >
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};