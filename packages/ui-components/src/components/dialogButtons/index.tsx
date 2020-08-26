import React from "react";
import { Button } from "@material-ui/core";

import * as muiStyles from '@material-ui/styles';

// ---

const useStyles = muiStyles.makeStyles({
    secondaryButton: {
        marginRight: 28,
        marginBottom: 14.1,
        letterSpacing: 1.25,
    },
    primaryButton: {
        marginRight: 16,
        marginBottom: 14.1,
        backgroundColor: '#1565C0',
        '&:hover': {
            backgroundColor: '#0d47a1',
        },
    },
});

// ---

export interface Button<ID> {
    id: ID;
    type: 'primary' | 'secondary';
    label: string;
    onClick: (id: ID) => void;
}

export interface DialogButtonsProps<ButtonID> {
    buttons: readonly Button<ButtonID>[];
}

export const DialogButtons = <ButtonID extends any>(
    props: DialogButtonsProps<ButtonID>,
): React.ReactElement => {
    const classes = useStyles();
    return (<>
        {props.buttons.map((button, index) => {
            switch (button.type) {
                case 'primary': return (
                        <Button
                            variant='contained'
                            color='primary'
                            className={classes.primaryButton}
                            onClick={() => { button.onClick(button.id); }}
                            autoFocus
                            key={index}
                        >
                            {button.label}
                        </Button>
                    );
                case 'secondary': return (
                        <Button
                            color='primary'
                            size='medium'
                            className={classes.secondaryButton}
                            onClick={() => { button.onClick(button.id); }}
                            key={index}
                        >
                            {button.label}
                        </Button>
                    );
            }
        })}
    </>);
};
