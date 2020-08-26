import * as React from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    // Typography
} from "@material-ui/core";

import { DialogButtons } from '../dialogButtons';

import { useStyles } from './styles';



export interface NamedFunctionComponent<P> {
    (props: P): React.ReactElement;
    displayName: string;
}

export interface PropsOpen {
    open: true;
    isOk: boolean;
    title: string;
    orderID: string;
    body: string;
    onClose: () => void;
}

export interface PropsClose {
    open: false;
}

export type Props = PropsOpen | PropsClose;

export const Component: NamedFunctionComponent<Props> = (props) => {
    const classes = useStyles();
    if (props.open) {
        const {
            open,
            isOk,
            title,
            orderID,
            body,
            onClose,
        } = props;
        return (
            <Dialog open={true}>
                <div className={classes.container}>
                    <DialogTitle>
                        {!isOk ? (
                            <div className={classes.failureTitle}>
                                {title}
                            </div>
                        ) : (
                            <div className={classes.successTitle}>
                                {title}
                            </div>
                        )}
                        <div className={classes.orderId}>
                            Order ID: {orderID}
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            className={classes.successFailureBodyText}
                        >
                            {body}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <DialogButtons
                            buttons={[
                                { id: 'close', label: 'CLOSE', type: 'secondary', onClick: onClose },
                            ]}
                        />
                    </DialogActions>
                </div>
            </Dialog>
        );
    } else {
        return (<Dialog open={false} children={[]} />);
    }
};
Component.displayName = 'OrderIDAndResultPopup';

