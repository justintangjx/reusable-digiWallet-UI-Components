import * as React from 'react';
import * as m from '../../models';
import * as h from '../helpers';
import * as c from '../common';

import { Element } from '../element/index';


const styleForWidth = (context: c.Context | undefined, width: number | 'full' | 'content' | undefined): React.CSSProperties => {
    if (width === undefined) {
        return {};
    }
    if (width === 'full') {
        if (context === undefined) {
            return {};
        }
        switch (context.parentLayoutType) {
            case undefined: return {};
            case 'flexColumn': return { alignSelf: 'stretch' };
            case 'flexRow': return {}; // Full-width in a flex-row parent is invalid and has no effect
            case 'flexColumnOneChild': return { alignSelf: 'stretch' };
            case 'flexRowOneChild': return { flexGrow: 1 };
        }
    }
    if (context === undefined) {
        return { width };
    }
    switch (context.parentLayoutType) {
        case 'flexColumn': return { width };
        case 'flexColumnOneChild': return { width };
        case 'flexRow': return { flexBasis: width };
        case 'flexRowOneChild': return { flexBasis: width };
        case undefined: return { width };
    }
};

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

const styleForGrow = (context?: c.Context, grow?: number): React.CSSProperties => {
    if (context === undefined || grow === undefined) {
        return {};
    }
    switch (context.parentLayoutType) {
        case undefined: return {};
        case 'flexColumn': return { flexGrow: grow };
        case 'flexRow': return { flexGrow: grow };
        case 'flexColumnOneChild': return { flexGrow: grow };
        case 'flexRowOneChild': return { flexGrow: grow };
    }
};

const context: c.Context = {
    parentLayoutType: 'flexColumn',
};

export const LinearLayoutV = (props: m.LinearLayoutV & { _context?: c.Context }) =>
    (<div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: props.options.alignV === 'top' ? 'flex-start' : props.options.alignV === 'bottom' ? 'flex-end' : 'center',
         // @todo: To handle `alignV` and `alignH`
        alignItems: props.options.alignH === 'left' ? 'flex-start' : props.options.alignH === 'right' ? 'flex-end' : 'center',
        width: props.options.width === 'full' ? undefined : props.options.width,
        height: props.options.height, // @todo: To handle `'content'` and `'full`
        margin: props.options.margin ? h.formatTopRightBottomLeft(props.options.margin) : undefined,
        padding: props.options.padding ? h.formatTopRightBottomLeft(props.options.padding) : undefined,
        ...props.options.width === 'full' ? styleForFullWidth(props._context) : {},
        ...props.options.height === 'full' ? styleForFullHeight(props._context) : {},
        ...styleForGrow(props._context, props.options.grow),
        overflowY: props.options.overflowY === 'scroll' ? 'scroll' : undefined,
    }}>
        {props.elements.map((element, index) => (<Element key={index} {...element} _context={context} />))}
    </div>);
