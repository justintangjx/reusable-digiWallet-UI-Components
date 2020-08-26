import * as React from 'react';

import { Button as MUIButton } from '@material-ui/core';

import * as m from '../../models';

import { Element } from '../element/index';

export const BigButton = (props: m.BigButton) =>
    // @todo: To implement full height... or not?
    (<MUIButton
        fullWidth={props.options.width === 'full'}
        style={{
            width: typeof props.options.width === 'number' ? props.options.width : undefined,
            height: typeof props.options.height === 'number' ? props.options.height : undefined,
        }}
        onClick={props.onAction}
    >
        <Element {...props.layout} />
    </MUIButton>);
