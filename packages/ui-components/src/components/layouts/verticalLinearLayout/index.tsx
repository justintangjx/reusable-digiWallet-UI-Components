import * as React from "react";
import { Typography, Button } from "@material-ui/core";

import { useStyles } from './styles';

import * as models from './models';

import {
    mapIconToSvgComponent,
} from './icons';

// ---

export const HeaderText = (props: models.HeaderTextProps): React.ReactElement => {
    const classes = useStyles();
    return (
        <Typography
            variant='h4'
            className={classes.headerText}
        >
            {props.text}
        </Typography>
    );
};

// ---

export const HeaderButton = (props: models.HeaderButtonProps): React.ReactElement => {
    const classes = useStyles();
    const IconComponent = mapIconToSvgComponent[props.icon];
    return (
        <Button
            variant="contained"
            color='primary'
            classes={{
                label: classes.label
            }}
            className={classes.primaryBtn}
            onClick={() => { props.onClick() }}
        >
            <IconComponent color={props.color} />
            <span style={{ marginLeft: 7 }}>{props.label}</span>
        </Button>
    );
};

// ---

export const Header = (props: models.HeaderProps): React.ReactElement => {
    const classes = useStyles();
    return (
        <div className={classes.header}>
            <HeaderText {...props.headerText} />
            {props.headerButton && <HeaderButton {...props.headerButton} />}
        </div>
    );
};

// ---

export interface BodyTextProps { text: string; }
export const BodyText = (props: BodyTextProps): React.ReactElement => {
    const classes = useStyles();
    return (
        <Typography
            variant='h4'
            gutterBottom
            className={classes.bodyText}
        >
            {props.text}
        </Typography>
    );
};

// ---

export interface SpacerProps { height: number; }
export const Spacer = (props: SpacerProps): React.ReactElement =>
    (<div style={{ height: props.height }} />);
