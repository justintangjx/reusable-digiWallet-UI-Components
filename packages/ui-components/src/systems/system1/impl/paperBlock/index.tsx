import * as React from 'react';

import { Paper } from '@material-ui/core';

import * as m from '../../models';
import * as h from '../helpers';
import * as c from '../common';
import * as va from '../valueAdapters';

import { Element } from '../element/index';

export const PaperBlock = (props: m.PaperBlock & { _context?: c.Context }) => {
    const widthC = va.dimSzC(props.options.width, props._context);
    const heightC = va.dimSzC(props.options.height, props._context);
    return (<Paper style={{
        ...widthC.asWidthToCSSDeclarations(),
        ...heightC.asHeightToCSSDeclarations(),
        margin: props.options.margin ? h.formatTopRightBottomLeft(props.options.margin) : undefined,
        padding: props.options.padding ? h.formatTopRightBottomLeft(props.options.padding) : undefined,
        overflowY: props.options.overflowY,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    }}>
        <Element {...props.layout} _context={{ parentLayoutType: 'flexColumnOneChild' }} />
    </Paper>);
};
