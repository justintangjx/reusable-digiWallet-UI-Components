import * as React from 'react';
import { errConfig, okConfig } from './onResponsePopupConfig';
import { PurchaseOrderCreateOnResponsePopup as GC, StepsModel } from './onResponsePopupP';

import { Component as OrderIDAndResultPopup } from '../orderIDAndResultPopup';

import { mapIconToSrc } from '../fieldListPopup/icons';

// @todo: To factor out
type Result<Ok, Err> =
    { isOk: true, ok: Ok } |
    { isOk: false, err: Err };

const getStepContent = (step: number): string => {
    if (step < okConfig.steps.length) {
        return okConfig.steps[step].bodyText;
    } else {
        return '';
    }
};

const stepsModels: readonly StepsModel[] =
    okConfig.steps.map((stepConfig): StepsModel =>
        stepConfig.headerIcon ?
        {
            type: 'textAndIcon',
            text: stepConfig.headerText,
            iconSrc: mapIconToSrc[stepConfig.headerIcon]
        } :
        {
            type: 'text',
            text: stepConfig.headerText,
        }
    );

interface PropsOpen {
    open: true;
    result: Result<{ orderID: string }, string>;
    onClose: () => void;
}

interface PropsClose {
    open: false;
}

type Props = PropsOpen | PropsClose;

export const PurchaseOrderCreateOnResponsePopup = (props: Props) => {
    if (!props.open) {
        return (<GC open={false} />);
    }
    if (props.result.isOk) {
        return (<GC
            open={true}
            title={okConfig.title}
            steps={stepsModels}
            getStepContent={getStepContent}
            orderID={props.result.ok.orderID}
            onClose={props.onClose}
        />);
    } else {
        return (<OrderIDAndResultPopup
            open={true}
            isOk={false}
            title={errConfig.title}
            body={errConfig.body}
            onClose={props.onClose}
            orderID='Order not created'
        />)
    }
}
