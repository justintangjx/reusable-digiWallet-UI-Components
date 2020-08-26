import { ReactElement, createElement, Fragment } from 'react';
import { SpinnerPopup } from '../spinnerPopup/index';

import { ModalPopup1 } from '../modalPopup1/index';

import {
    ProposeSubmitPropsAdapter,
    TSup,
    Props,
} from '@local/f-workflows/dist/proposeSubmit/index';

import { ITs } from '@local/f-model/dist/groups/tokenTransfer/workflows/proposeSubmit';

import { propsAdapt } from '../../models/proposeSubmitAdapters/index';

// ---

const componentFactoryFactory =
    <Props>(f: (props: Props) => ReactElement) =>
        (...props: Parameters<typeof f>) => createElement(f, props[0]);

const SpinnerPopupFactory = componentFactoryFactory(SpinnerPopup);
const ModalPopup1Factory = componentFactoryFactory(ModalPopup1);

// ---

type ProposeSubmitPropsAdapterComponents<T extends TSup> = {
    [C in keyof ProposeSubmitPropsAdapter<T>]: (props: ProposeSubmitPropsAdapter<T>[C]) => ReactElement;
};

// ---

const adapter: ProposeSubmitPropsAdapterComponents<ITs['tokenTransferReject']> = {
    proposalActionDialog: (props): ReactElement => {
        if (!props.open) {
            return ModalPopup1Factory({ open: false, elements: [] });
        }
        return ModalPopup1Factory({
            open: true,
            width: 376,
            elements: [
                { type: 'headerText', text: 'Reject this transfer' },
                { type: 'spacer', size: 8 },
                { type: 'text', lineHeight:1.5, text: 'Are you sure? This action cannot be undone. If you are sure, click “CONFIRM”' },
                { type: 'spacer', size: 24 },
                {
                    type: 'actionBar',
                    elements: [
                        { type: 'spacer', grow: 1 },
                        { type: 'button', buttonType: 'secondary', label: 'CANCEL', onAction: () => { props.onProposeAction('reject')} },
                        { type: 'spacer', size: 22 },
                        { type: 'button', buttonType: 'primary', label: 'CONFIRM', onAction: () => { props.onProposeAction('accept')} },
                    ],
                },
            ],
        });
    },
    progressIndicator:
        (props): ReactElement => {
            return SpinnerPopupFactory({
                isOpen: props.open,
                title: 'Rejecting transfer',
                body: 'Please wait...',
            });
        },
    responseReceived: (props) => {
        if (props.open === false) {
            return ModalPopup1Factory({ open: false, elements: [] });
        }
        if (props.response.isOk) {
            const order = props.params.order;

            return ModalPopup1Factory({
                open: true,
                width: 280,
                elements: [
                    { type: 'headerText', text: 'You rejected this transfer' },
                    { type: 'spacer', size: 8 },
                    // @todo: To get unit of token
                    // @todo: To format account ID
                    { type: 'text', text: `Sender will be notified.` },
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
                width: 280,
                elements: [
                    { type: 'headerText', text: 'Sorry, an error occurred while rejecting the transfer',color:'red' },
                    { type: 'spacer', size: 8 },
                    { type: 'text', text: props.response.err },
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

export type RejectProps = Props<ITs['tokenTransferReject']>;
export const Reject = (props: RejectProps): ReactElement => {
    const v = propsAdapt(props);
    return createElement(Fragment, {
        children: [
            // @todo: To work out the ts-ignore next time. It is due to tagged-union type check problems.
            // @ts-ignore
            createElement(adapter.proposalActionDialog, v.proposalActionDialog),
            createElement(adapter.progressIndicator, v.progressIndicator),
            // @ts-ignore
            createElement(adapter.responseReceived, v.responseReceived),
        ],
    });
};
