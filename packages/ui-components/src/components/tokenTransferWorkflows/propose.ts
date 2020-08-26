import { ReactElement, FunctionComponent, createElement, Fragment } from 'react';
import {
    SpinnerPopup,
} from '../spinnerPopup/index';

import {
    ModalPopup1,
} from '../modalPopup1/index';

import {
    Props,
    TSup,
} from '@local/f-workflows/dist/formProposeSubmit/index';

import {
    PropsAdapter,
    adapt as propsAdapt,
} from '../../models/formProposeSubmitAdapters/index';

import {
    resultC,
} from '@local/result';
import {
    ITs as FormProposeSubmitITs,
} from '@local/f-model/dist/groups/tokenTransfer/workflows/formProposeSubmit';

import {
    assetAndTokenConfigGetItemByTokenTypeName,
} from '@local/f-model/dist/config';

// ---

const componentFactoryFactory =
    <Props>(f: (props: Props) => ReactElement) =>
        (...props: Parameters<typeof f>) => createElement(f, props[0]);

const SpinnerPopupFactory = componentFactoryFactory(SpinnerPopup);
const ModalPopup1Factory = componentFactoryFactory(ModalPopup1);

// ---

type PropsAdapterComponents<T extends TSup> = {
    [C in keyof PropsAdapter<T>]: (props: PropsAdapter<T>[C]) => ReactElement;
};

// ---

const adapter: PropsAdapterComponents<FormProposeSubmitITs['tokenTransferPropose']> = {
    formDialog: (props) => {
        if (!props.open) {
            return ModalPopup1Factory({ open: false, elements: [] });
        }

        let tokenType = assetAndTokenConfigGetItemByTokenTypeName(resultC(props.params.assetAndTokenConfig).unwrapOr([]), props.formData.tokenTypeName);

        return ModalPopup1Factory({
            open: true,
            width: 400,
            elements: [
                { type: 'headerText', text: 'Transfer token' },
                { type: 'spacer', size: 8 },
                { type: 'text', lineHeight:1.5, text: 'Enter recipient account ID, select the token type and enter the amount to transfer.' },
                { type: 'spacer', size: 20 },
                { type: 'formInputs', fieldInputToFieldInputSpacing: 24, elements: [
                    {
                        label: 'Recipient Account ID',
                        width: 350,
                        type: 'text',
                        value: props.formData.toAccountID,
                        onUpdate: (value) => { props.onUpdateFormData({ toAccountID: value })},
                        
                    },
                    {
                        label: 'Token Type',
                        type: 'dropdown',
                        width: 350,
                        options: resultC(props.params.assetAndTokenConfig)
                            .map(config =>
                                config.map(configItem => (
                                    { label: configItem.tokenTypeLabel, value: configItem.tokenTypeName }
                                )),
                            )
                            .unwrapOr([{ label: props.formData.tokenTypeName, value: props.formData.tokenTypeName }]),
                        value: props.formData.tokenTypeName,
                        onUpdate: (value) => { props.onUpdateFormData({ tokenTypeName: value })},
                    },
                    {
                        label: 'Amount',
                        width: 350,
                        type: 'text',
                        value: props.formData.amount,
                        onUpdate: (value) => { props.onUpdateFormData({ amount: value })},
                        placeholder: tokenType.isOk ? tokenType.ok.tokenTypeUnit : undefined,
                    },
                ]},
                { type: 'spacer', size: 24 },
                {
                    type: 'actionBar',
                    elements: [
                        { type: 'spacer', grow: 1 },
                        { type: 'button', buttonType: 'secondary', label: 'CANCEL', onAction: () => { props.onFormAction('back')} },
                        { type: 'spacer', size: 22 },
                        { type: 'button', buttonType: 'primary', label: 'NEXT', onAction: () => { props.onFormAction('propose')} },
                    ],
                },
            ],
        });
    },
    proposalActionDialog: (props) => {
        if (!props.open) {
            return ModalPopup1Factory({ open: false, elements: [] });
        }
        let tokenType = assetAndTokenConfigGetItemByTokenTypeName(resultC(props.params.assetAndTokenConfig).unwrapOr([]), props.formData.tokenTypeName);

        return ModalPopup1Factory({
            open: true,
            width: 376,
            elements: [
                { type: 'headerText', text: 'Confirm transfer details' },
                { type: 'spacer', size: 8 },
                { type: 'text', lineHeight: 1.5, text: 'Please make sure the recipient, token type and the amount you entered is correct.' },
                { type: 'spacer', size: 20 },
                { type: 'fields', fieldToFieldSpacing: 6, labelWidth: 120, labelToValueSpacing: 18, fields: [
                    { label: 'Recipient:', value: { type: 'text', text: props.formData.toAccountID } },
                    { label: 'Token:', value: { type: 'text', text: tokenType.isOk ? tokenType.ok.assetTypeLabel : props.formData.tokenTypeName } },
                    { label: 'Amount:', value: { type: 'text', text: `${props.formData.amount} ${tokenType.isOk ? tokenType.ok.tokenTypeUnit : 'Tokens'}` } },


                  ]},
                  { type: 'spacer', size: 30 },
                {
                    type: 'actionBar',
                    elements: [
                        { type: 'spacer', grow: 1 },
                        { type: 'button', buttonType: 'secondary', label: 'BACK', onAction: () => { props.onProposeAction('reject')} },
                        { type: 'spacer', size: 22 },
                        { type: 'button', buttonType: 'primary', label: 'SUBMIT', onAction: () => { props.onProposeAction('accept')} },
                    ],
                },
            ],
        });
    },
    progressIndicator:
        (props) => {
            return SpinnerPopupFactory({
                isOpen: props.open,
                title: 'Processing',
                body: 'Please wait...',
            });
        },
    responseReceived: (props) => {
        if (props.open === false) {
            return ModalPopup1Factory({ open: false, elements: [] });
        }
        if (props.response.isOk) {
            // const order = props.params.;

            return ModalPopup1Factory({
                open: true,
                width: 376,
                elements: [
                    { type: 'headerText', text: 'Transfer proposed', color:'green' },
                    { type: 'spacer', size: 4 },
                    { type: 'headerText', text: `Transaction ID: ${props.response.ok.transactionID}` },
                    { type: 'spacer', size: 8 },
                    // @todo: To get unit of token
                    // @todo: To format account ID
                    { type: 'text', lineHeight:1.5, text: `Next, you will be notified when the recipient accept or reject the transfer.` },
                    { type: 'spacer', size: 24 },
                    {
                        type: 'actionBar',
                        elements: [
                            { type: 'spacer', grow: 1 },
                            { type: 'button', buttonType: 'secondary', label: 'CLOSE', onAction: () => { props.onClose(); } },
                        ],
                    },
                ],
            });
        } else {
            return ModalPopup1Factory({
                open: props.open,
                width: 376,
                elements: [
                    { type: 'headerText', text: 'Unexpected error occurred', color:'red' },
                    { type: 'spacer', size: 8 },
                    { type: 'text', lineHeight:1.5, text: props.response.err },
                    { type: 'spacer', size: 22 },
                    {
                        type: 'actionBar',
                        elements: [
                            { type: 'spacer', grow: 1 },
                            { type: 'button', buttonType: 'secondary', label: 'CLOSE', onAction: () => { props.onClose(); } },
                        ],
                    },
                ],
            });
        }
    },
};

export type ProposeProps = Props<FormProposeSubmitITs['tokenTransferPropose']>;
export const Propose = (props: ProposeProps): React.ReactElement => {
    const v = propsAdapt(props);
    return createElement(Fragment, {
        children: [
            // @todo: To work out the ts-ignore next time. It is due to tagged-union type check problems.
            // @ts-ignore
            createElement(adapter.formDialog, v.formDialog),
            // @ts-ignore
            createElement(adapter.proposalActionDialog, v.proposalActionDialog),
            createElement(adapter.progressIndicator, v.progressIndicator),
            // @ts-ignore
            createElement(adapter.responseReceived, v.responseReceived),
        ],
    });
};
