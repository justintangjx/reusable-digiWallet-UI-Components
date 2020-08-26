import * as React from 'react';

import * as dataModels from '@local/f-model/dist/purchaseOrder';
import * as configModels from '@local/f-model/dist/config';

import { FieldListPopup } from '../fieldListPopup';
import { ErrorPopup } from './ErrorPopup';

import * as common from './helpers';

// ---

export interface PropsNone {
    type: 'none';
}

export interface PropsPopup<ButtonID> {
    type: 'popup';
    onAction: (actionID: ButtonID) => void;
    assetAndTokenConfig: configModels.AssetAndTokenConfig;
    userID: string;
    purchaseOrder: dataModels.PurchaseOrder;
}

export interface PropsError {
    type: 'error';
    message: string;
}

export type Props<ActionID> = PropsNone | PropsPopup<ActionID> | PropsError;

const isNotNull = <T extends any>(x: T | null): x is T => x !== null;

// ---

const title = 'Order details';

export type AssetTokenizationOrdersDetailsButtonID = 'cancelOrder' | 'close';
export type AssetTokenizationOrdersDetailsProps = Props<AssetTokenizationOrdersDetailsButtonID>;
export const AssetTokenizationOrdersDetails = (props: AssetTokenizationOrdersDetailsProps): React.ReactElement => {
    type ActionID = AssetTokenizationOrdersDetailsButtonID;
    switch (props.type) {
        case 'none': return (<FieldListPopup{...{ isOpen: false, title: 'Order Details', fields: [], buttons: [] }} />);
        case 'popup':
            return (<FieldListPopup<ActionID> {...{
                isOpen: true,
                title,
                fields: common.mapPurchaseOrderToFieldList(props.assetAndTokenConfig, props.userID, 'assetOwner', props.purchaseOrder),
                buttons: [
                    // Orders can be cancelled before both asset custodian and token creator assets the nomination.
                    props.purchaseOrder.orderStatus === 'orderCreated' || props.purchaseOrder.orderStatus === 'orderAccepted' ?
                        common.buttonCreators.cancelOrder<ActionID>('cancelOrder', props.onAction) :
                        null,
                    common.buttonCreators.close<ActionID>('close', props.onAction),
                ].filter(isNotNull),
            }}/>);
        case 'error': return ErrorPopup(props);
    }
};

// ---

export type AssetRegistrationOrdersButtonID = 'cancel' | 'registerAsset';
export type AssetRegistrationOrdersDetailsProps = Props<AssetRegistrationOrdersButtonID>;
export const AssetRegistrationOrdersDetails = (props: AssetRegistrationOrdersDetailsProps): React.ReactElement => {
    type ActionID = AssetRegistrationOrdersButtonID;
    switch (props.type) {
        case 'none': return FieldListPopup({ isOpen: false, title: 'Order Details', fields: [], buttons: [] });
        case 'popup':
            return FieldListPopup<ActionID>({
                isOpen: true,
                title,
                fields: common.mapPurchaseOrderToFieldList(props.assetAndTokenConfig, props.userID, 'assetCustodian', props.purchaseOrder),
                buttons:
                    props.purchaseOrder.orderStatus === 'orderAccepted' ?
                        [
                            common.buttonCreators.cancel<ActionID>('cancel', props.onAction),
                            common.buttonCreators.registerAsset<ActionID>('registerAsset', props.onAction),
                        ] :
                        [
                            common.buttonCreators.close<ActionID>('cancel', props.onAction),
                        ],
            });
        case 'error': return ErrorPopup(props);
    }
};


// ---

export type TokenMintingOrdersActionID = 'cancel' | 'mintToken';
export type TokenMintingOrdersDetailsProps = Props<TokenMintingOrdersActionID>;
export const TokenMintingOrdersDetails = (props: TokenMintingOrdersDetailsProps): React.ReactElement => {
    type ActionID = TokenMintingOrdersActionID;
    switch (props.type) {
        case 'none': return FieldListPopup({ isOpen: false, title: 'Order Details', fields: [], buttons: [] });
        case 'popup':
            return FieldListPopup<ActionID>({
                isOpen: true,
                title,
                fields: common.mapPurchaseOrderToFieldList(props.assetAndTokenConfig, props.userID, 'tokenCreator', props.purchaseOrder),
                buttons:
                    props.purchaseOrder.orderStatus === 'assetRegistered' ?
                        [
                            common.buttonCreators.cancel<ActionID>('cancel', props.onAction),
                            common.buttonCreators.mintToken<ActionID>('mintToken', props.onAction),
                        ] :
                        [
                            common.buttonCreators.close<ActionID>('cancel', props.onAction),
                        ],
            });
        case 'error': return ErrorPopup(props);
    }
};
