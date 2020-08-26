import * as React from 'react';
import {
    Stepper,
    StepConnector,
    StepLabel,
    StepContent,
    Step,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Typography
} from '@material-ui/core';
import {
    DialogButtons,
} from '../dialogButtons/index';
import { useStyles } from './stepperStyles';


export interface StepTextAndIcon {
    type: "textAndIcon";
    iconSrc: string;
    text: string;
}

export interface StepText {
    type: "text";
    text: string;
}

export type StepsModel = StepTextAndIcon | StepText;

export interface StepperPropsOpen {
    open: true;
    title: string;
    orderID: string;
    steps: readonly StepsModel[];
    getStepContent: (step: number) => string;
    onClose: () => void;
}

export interface StepperPropsClose {
    open: false;
}

export type StepperProps = StepperPropsOpen | StepperPropsClose;

export const PurchaseOrderCreateOnResponsePopup = (
    props: StepperProps,
) => {

    const classes = useStyles();

    if (!props.open) {
        return (<Dialog open={false}><div className={classes.container} /></Dialog>);
    }

    return (
        <Dialog open={true}>
            <div className={classes.container}>
                <DialogTitle className={classes.dialogTitle}>
                    <div className={classes.stepperTitle}>
                        {props.title}
                    </div>
                    Order ID: {props.orderID}
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <DialogContentText className={classes.bodyText}>
                        Keep track of your order status:
                    </DialogContentText>
                    <Stepper
                        orientation="vertical"
                        className={classes.stepperStyle}
                        connector={
                            <StepConnector
                                classes={{
                                    root: classes.connectorRoot,
                                    line: classes.connectorLine
                                }}
                            />
                        }
                    >
                        {props.steps.map((step, index) => (
                            <Step key={step.text}>
                                <StepLabel
                                    icon={" "}
                                    StepIconProps={{
                                        classes: {
                                            root: classes.stepIcon,
                                            active: classes.active
                                        }
                                    }}
                                    classes={{
                                        label: classes.stepLabel
                                    }}
                                >
                                    {step.type === "textAndIcon" && (
                                        <img
                                            className={classes.labelIcon}
                                            src={step.iconSrc}
                                            alt={'Loading...'}
                                        />
                                    )}
                                    {step.text}
                                </StepLabel>

                                <StepContent
                                    active={true}
                                    className={classes.stepContent}
                                >
                                    <Typography>
                                        {props.getStepContent(index)}
                                    </Typography>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </DialogContent>
                <DialogActions>
                    <DialogButtons buttons={[
                        { id: 'close', type: 'secondary', label: 'CLOSE', onClick: props.onClose }
                    ]} />
                </DialogActions>
            </div>
        </Dialog>
    );
};
