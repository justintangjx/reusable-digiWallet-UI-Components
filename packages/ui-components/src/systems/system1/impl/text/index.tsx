import * as React from 'react';

import { Typography } from '@material-ui/core';

import * as m from '../../models';
import * as h from '../helpers';


export const Text = (props: m.Text) =>
    // Tooltips not implemented
    (<Typography style={{
            flexShrink: 0,
            margin: props.options.margin ? h.formatTopRightBottomLeft(props.options.margin) : undefined,
            padding: props.options.padding ? h.formatTopRightBottomLeft(props.options.padding) : undefined,
            color: props.options.colorCSS || props.options.color,
            fontSize: props.options.fontSize,
            fontWeight: props.options.fontWeight,
            lineHeight: props.options.lineHeight === 'content' ? 'normal' : props.options.lineHeight,
            width: props.options.width,
            // @todo: To implement word-wrap options
            // overflowWrap: 'anywhere', 
        }}>
            {props.text}
        </Typography>);
