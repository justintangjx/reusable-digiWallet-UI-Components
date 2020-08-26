import React from "react";

import { Button } from "@material-ui/core";

import { makeStyles, WithStyles, createStyles } from '@material-ui/styles';

import {
    ActionBarElementSpacer,
    ActionBarElementButton,
    ActionBarProps,
} from '../models';

// ---

const styles = createStyles({
    secondaryButton: {
        // marginBottom: 14.1,
        letterSpacing: 1.25,
    },
    primaryButton: {
        letterSpacing: 1.25,
        // marginBottom: 14.1,
        backgroundColor: '#1565C0',
        '&:hover': {
            backgroundColor: '#0d47a1',
        },
    },
});
type Classes = WithStyles<typeof styles>;
const useStyles = makeStyles(styles);

// ---

const ElementSpacer = (props: ActionBarElementSpacer) => (<div style={{ flexBasis: props.size || 0, flexGrow: props.grow }} />);

const ElementButton = (props: ActionBarElementButton & Classes) => {
    switch (props.buttonType) {
        case 'primary':
            return (
                <Button
                    variant='contained'
                    color='primary'
                    style={{}}
                    className={props.classes.primaryButton}
                    onClick={() => { props.onAction(); }}
                    autoFocus={props.autofocus}
                >
                    {props.label}
                </Button>
            );
        case 'secondary':
            return (
                <Button
                    color='primary'
                    size='medium'
                    className={props.classes.secondaryButton}
                    onClick={() => { props.onAction(); }}
                    autoFocus={props.autofocus}
                >
                    {props.label}
                </Button>
            );
    }
};

export const ActionBar = (
    props: ActionBarProps,
): React.ReactElement => {
    const classes = useStyles();
    return (<div style={{ display: 'flex' }}>
        {props.elements.map((element, index) => {
            switch (element.type) {
                case 'spacer': return (<ElementSpacer key={index} {...element} />);
                case 'button': return (<ElementButton key={index} {...element} classes={classes} />);
            }
        })}
    </div>);
};
