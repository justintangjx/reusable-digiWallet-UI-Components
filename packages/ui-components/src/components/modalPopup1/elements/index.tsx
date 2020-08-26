import * as React from 'react';

import {
    Icon,
    SpacerProps,
    TextProps,
    HeaderTextProps,
    EmphasisTextProps,
    ElementProps,
} from '../models';

import {
    Classes,
    useStyles,
} from './styles';

// ---

import {
    Fields,
} from './fields/index';

import {
    FormInputs,
} from './formInput/index';

import {
    ActionBar,
} from './actionBar';

// ---


// const mapColor = (color: m.Color = 'black'): string => {
//     const colorMap: Record<m.Color, string> = {
//         black: 'black',
//         green: 'green',
//         red: 'red',
//     };
//     return colorMap[color];
// };

const Spacer = (props: SpacerProps) => (<div style={{ flexBasis: props.size, flexGrow: props.grow }} />);

const Text = (props: TextProps & Classes) =>
    (<div className={props.classes.text} style={{ color: props.color, lineHeight: props.lineHeight }}>{props.text}</div>);
const HeaderText = (props: HeaderTextProps & Classes) =>
    (<div className={props.classes.headerText} style={{ color: props.color, lineHeight: props.lineHeight }}>{props.text}</div>);
const EmphasisText = (props: EmphasisTextProps & Classes) =>
    (<div className={props.classes.emphasisText} style={{ color: props.color, lineHeight: props.lineHeight }}>{props.text}</div>);

export const Element = (props: ElementProps): React.ReactElement => {
    const classes = useStyles();
    switch (props.type) {
        case 'spacer': return (<Spacer {...props} />);
        case 'text': return (<Text {...props} classes={classes} />);
        case 'headerText': return (<HeaderText {...props} classes={classes} />);
        case 'emphasisText': return (<EmphasisText {...props} classes={classes} />);
        case 'fields': return (<Fields {...props} />);
        case 'formInputs': return (<FormInputs {...props} />);
        case 'actionBar': return (<ActionBar {...props} />);
    }
};
