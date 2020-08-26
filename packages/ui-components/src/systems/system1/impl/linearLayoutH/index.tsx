import * as React from 'react';
import * as m from '../../models';
import * as h from '../helpers';
import * as c from '../common';
import { Element } from '../element/index';

const styleForWidth = (context: c.Context | undefined, width: number | 'full' | 'content' | undefined): React.CSSProperties => {

    if (typeof width === 'undefined') return {};

    if (typeof width === 'number') {
        if (typeof context === 'undefined') return {width};
        switch (context.parentLayoutType) {
            case 'flexRow': return {flexBasis: width};
            case 'flexRowOneChild': return {flexBasis: width};
            case 'flexColumn': return {width};
            case 'flexColumnOneChild': return {width};
        }
        return {width};
    }

    if (width === 'full') {
        if (context === undefined) return {};
        switch (context.parentLayoutType) {
            case 'flexRow': return {}; // Full-width in a flex-row parent is invalid and has no effect
            case 'flexRowOneChild': return { flexGrow: 1 };
            case 'flexColumn': return { alignSelf: 'stretch' };
            case 'flexColumnOneChild': return { alignSelf: 'stretch' };
        }
        return {};
    }

    if (width ==='content') {
        if (context === undefined) return {width};
        switch (context.parentLayoutType) {
            case 'flexColumn': return {width};
            case 'flexColumnOneChild': return {width};
            case 'flexRow': return { flexBasis: width};
            case 'flexRowOneChild': return { flexBasis: width};
        }
        return {width};
    }

    return {};

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

const context: c.Context = {
    parentLayoutType: 'flexRow',
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

export const LinearLayoutH = (props: m.LinearLayoutH & { _context?: c.Context }) =>
    (<div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: props.options.alignH === 'left' ? 'flex-start' : props.options.alignH === 'right' ? 'flex-end' : 'center',
        alignItems: props.options.alignV === 'top' ? 'flex-start' : props.options.alignV === 'bottom' ? 'flex-end' : 'center',
        height: props.options.height, // @todo: To handle `'content'` and `'full`
        margin: props.options.margin ? h.formatTopRightBottomLeft(props.options.margin) : undefined,
        padding: props.options.padding ? h.formatTopRightBottomLeft(props.options.padding) : undefined,
        ...styleForWidth(props._context, props.options.width),
        ...props.options.height === 'full' ? styleForFullHeight(props._context) : {},
        ...styleForGrow(props._context, props.options.grow),
    }}>
        {props.elements.map((element, index) => (<Element key={index} {...element} _context={context} />))}
    </div>);
