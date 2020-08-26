import React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core";

import { DialogButtons, Button } from '../dialogButtons';
import { useStyles } from './styles';

export interface PropsOpen<ButtonID> {
    readonly type: 'open';
    readonly title: string;
    readonly text: string;
    readonly buttons: readonly Button<ButtonID>[];
}

export interface PropsClose {
    readonly type: 'close';
}

export type Props<ButtonID> = PropsOpen<ButtonID> | PropsClose;

export const ModalDialogText = <ButtonID extends any>(
    props: Props<ButtonID>,
): React.ReactElement => {
    
    const classes = useStyles();

    if (props.type === 'close') {
        return (<Dialog open={false} children={[]} />);
    }

    return (
        <Dialog open={true}>
            <div className={classes.notificationsModal}>
                <DialogTitle
                    id="generic-notification-title"
                    className={classes.modalTitle}
                >
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="generic-notification-description"
                        className={classes.modalBodyText}
                    >
                        {props.text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <DialogButtons buttons={props.buttons} />
                </DialogActions>
            </div>
        </Dialog>
    );
};
