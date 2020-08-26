import * as React from 'react';
import { FunctionComponent } from 'react';

import { SpinnerPopup } from '../spinnerPopup';
import { Component as OrderIDAndResultPopup } from '../orderIDAndResultPopup';

// @todo: To refactor
type Res =
    { isOk: true, ok: null } |
    { isOk: false, err: string };


export interface InProgressProps {
    open: boolean;
}

export type InProgressPopupT = FunctionComponent<InProgressProps>;

interface InProgressParams {
    title: string;
    body: string;
}

const InProgressPopupCreator = 
    (params: InProgressParams): InProgressPopupT =>
        (props) =>
            (<SpinnerPopup
                isOpen={props.open}
                title={params.title}
                body={params.body}
            />);

interface ResultParams {
    title: string;
    successBody: string;
}

export interface ResultPopupPropsOpen {
    open: true;
    orderID: string;
    result: Res;
    onClose: () => void;
}

export interface ResultPopupPropsClose {
    open: false;
}

export type ResultPopupProps = ResultPopupPropsOpen | ResultPopupPropsClose;

export type ResultPopupT = FunctionComponent<ResultPopupProps>;

export const resultPopupCreator =
    (params: ResultParams) =>
        (props: ResultPopupProps) =>
            props.open ?
                (<OrderIDAndResultPopup
                    open={true}
                    orderID={props.orderID}
                    isOk={props.result.isOk}
                    title={props.result.isOk ? params.title : 'Unexpected error occured'}
                    body={props.result.isOk ? params.successBody : props.result.err}
                    onClose={props.onClose}
                />) :
                (<OrderIDAndResultPopup open={false} />);

export const RegisterAssetInProgressPopup = InProgressPopupCreator({
    title: 'Registering assets',
    body: 'Please wait...',
});

export const RegisterAssetResultPopup = resultPopupCreator({
    title: 'Assets registered',
    successBody: 'Registration successful. Token creator is now able to mint token for this asset.',
});

export const MintTokenInProgressPopup = InProgressPopupCreator({
    title: 'Minting token',
    body: 'Please wait...',
});

export const MintTokenResultPopup = resultPopupCreator({
    title: 'Token minted',
    successBody: 'Token minting successful. Token will be transferred to owner’s wallet.',
});

