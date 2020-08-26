import * as React from "react";

import {
    Dialog,
    DialogTitle,
    // DialogContent,
    DialogContentText
} from "@material-ui/core";

import CircularProgress from "@material-ui/core/CircularProgress";


import { useStyles } from './styles'

export interface SpinnerPopupProps {
    isOpen: boolean;
    titleLeft?: number;
    title?: string;
    bodyLeft?: number;
    body?: string;
}

export const SpinnerPopup = ({
    isOpen,
    title = '',
    titleLeft = 0,
    body = '',
    bodyLeft = 0,
}: SpinnerPopupProps): React.ReactElement => {

    const classes = useStyles();

    return (
        <Dialog open={isOpen}>
            <div className={classes.popupSize}>
                <div className={classes.spinnerContainer}>
                    <CircularProgress size={50} thickness={4.5} color={"primary"} className={classes.colorPrimary}/>
                </div>
                <DialogTitle style={{ display: 'flex', justifyContent: 'center', marginLeft: titleLeft }}>{title}</DialogTitle>
                <DialogContentText style={{ marginLeft: bodyLeft }}align='center'>{body}</DialogContentText>
            </div>
        </Dialog>
    );

};
