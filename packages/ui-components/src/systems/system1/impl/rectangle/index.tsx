import * as React from 'react';

import * as m from '../../models';
import * as h from '../helpers';
import * as c from '../common';


const styleForFullWidth = (context?: c.Context): React.CSSProperties => {
    if (context === undefined) {
        return {};
    }
    switch (context.parentLayoutType) {
        case undefined: return {};
        case 'flexColumn': return {
            alignSelf: 'stretch',
        };
        case 'flexRow': return {}; // Full-width in a flex-row parent is invalid and has no effect
        case 'flexColumnOneChild': return {
            alignSelf: 'stretch',
        };
        case 'flexRowOneChild': return {
            flexGrow: 1,
        };
    }
};

const styleForFullHeight = (context?: c.Context): React.CSSProperties => {
    if (context === undefined) {
        return {};
    }
    switch (context.parentLayoutType) {
        case undefined: return {};
        case 'flexColumn': return {}; // Full-height in a flex-column parent is invalid and has no effect
        case 'flexRow': return {
            alignSelf: 'stretch',
        }; 
        case 'flexColumnOneChild': return {
            flexGrow: 1,
        };
        case 'flexRowOneChild': return {
            alignSelf: 'stretch',
        };
    }
};

// ---

export const Rectangle = (props: m.Rectangle & { _context?: c.Context }) => 
    (<div 
        style={{
            width: props.width === 'full' ? undefined : props.width,
            height: props.height === 'full' ? undefined : props.height, // @todo: To handle `'content'` and `'full`
            backgroundColor: props.color,
            margin: props.options.margin ? h.formatTopRightBottomLeft(props.options.margin) : undefined,
            ...props.width === 'full' ? styleForFullWidth(props._context) : {},
            ...props.height === 'full' ? styleForFullHeight(props._context) : {},
        }}
    />);
