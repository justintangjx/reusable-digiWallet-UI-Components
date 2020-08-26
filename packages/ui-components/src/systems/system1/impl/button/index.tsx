import * as React from 'react';

import { Button as MUIButton } from '@material-ui/core';

import * as m from '../../models';
import * as vt from '../../models/values';

const mapColor: Record<vt.Color, string> = {
    black: 'black',
    blue: 'blue',
    green: '#1DD1A1',
    red: '#EE5253',
    darkgray: 'darkgray',
};

export const Button = (props: m.Button) =>
    // @todo: To implement full height... or not?
    (<MUIButton
        color='primary'
        variant={props.options.style}
        fullWidth={props.options.width === 'full'}
        style={{
            width: typeof props.options.width === 'number' ? props.options.width : undefined,
            height: typeof props.options.height === 'number' ? props.options.height : undefined,
            backgroundColor: props.options.color ? mapColor[props.options.color] : undefined,
        }}
        onClick={() => {
            props.onAction();
        }}
    >
        {props.label}
    </MUIButton>);
