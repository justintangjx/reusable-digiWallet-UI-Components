import * as dataModels from '@local/f-model/dist/purchaseOrder';
import * as configModels from '@local/f-model/dist/config';
import * as fieldListPopupModels from '../fieldListPopup/models';
import * as dialogButtons from '../dialogButtons/index';

import { orderStatusTooltips } from './tooltips';

// ---

// Because black text is the most common field type
const blackText = (label: string, text: string): fieldListPopupModels.Field => ({
    type: 'text',
    label,
    text,
    color: 'black',
});

const orderStatusLabel = 'Order status';

type Role = 'assetOwner' | 'assetCustodian' | 'tokenCreator';

const formatOrderStatus =
    (role: Role): Record<dataModels.OrderStatus, fieldListPopupModels.Field> =>
        ({
            orderCreated: { type: 'iconAndText', label: orderStatusLabel, icon: 'clock', tooltip: orderStatusTooltips[role].orderCreated, text: 'Order created', color: 'black' },
            orderCancelled: { type: 'iconAndText', label: orderStatusLabel, icon: 'x', text: 'Order cancelled', color: 'red' },
            orderRejected: { type: 'iconAndText', label: orderStatusLabel, icon: 'x', text: 'Order failed', color: 'red' },
            orderAccepted: { type: 'iconAndText', label: orderStatusLabel, icon: 'tick', tooltip: orderStatusTooltips[role].orderAccepted, text: 'Order accepted', color: 'black' },
            assetRegistered: blackText(orderStatusLabel, 'Asset registered'),
            tokenMinted: blackText(orderStatusLabel, 'Asset tokenized'),
        });

type AppointmentRole = 'assetCustodian' | 'tokenCreator';

const formatRoleToLabel: Record<AppointmentRole, string> = {
    assetCustodian: 'Asset custodian',
    tokenCreator: 'Token creator',
};

const formatAppointment = (role: AppointmentRole, currentUserID: string, appointeeUserID: string, appointmentStatus: dataModels.AppointmentStatus): fieldListPopupModels.Field => {

    const label = formatRoleToLabel[role];
    if (appointeeUserID === currentUserID) {
        return blackText(label, 'You');
    }
    switch (appointmentStatus) {
        case 'nominated': return { type: 'iconAndText', label, icon: 'clock', tooltip: 'Has not accepted the appointment', text: appointeeUserID, color: 'black' };
        case 'nominationAccepted': return blackText(label, appointeeUserID);
        case 'nominationRejected': return { type: 'iconAndText', label, icon: 'x', tooltip: 'Rejected', text: appointeeUserID, color: 'red' };
    }
};

const getAssetTypeLabel = (assetConfig: configModels.AssetAndTokenConfig, assetTypeName: string): string => {
    for (const assetConfigItem of assetConfig) {
        if (assetConfigItem.assetTypeName === assetTypeName) {
            return assetConfigItem.assetTypeLabel;
        }
    }
    return `Asset-label for asset-type [${assetTypeName}] was not found in config.`;
};

const getTokenTypeLabel = (assetConfig: configModels.AssetAndTokenConfig, assetTypeName: string): string => {
    for (const assetConfigItem of assetConfig) {
        if (assetConfigItem.assetTypeName === assetTypeName) {
            return assetConfigItem.tokenTypeLabel;
        }
    }
    // @todo: This should be an error instead, but a weak one
    return `Token-label for asset-type [${assetTypeName}] was not found in config.`;
};

const getATConfigItem = (assetConfig: configModels.AssetAndTokenConfig, assetTypeName: string): configModels.AssetAndTokenConfigItem | null => {
    for (const assetConfigItem of assetConfig) {
        if (assetConfigItem.assetTypeName === assetTypeName) {
            return assetConfigItem;
        }
    }
    // @todo: This should be an error instead, but a weak one
    return null;
};

export const mapPurchaseOrderToFieldList = (
    assetConfig: configModels.AssetAndTokenConfig,
    currentUserID: string,
    currentUserRole: Role,
    x: dataModels.PurchaseOrder,
): readonly fieldListPopupModels.Field[] => {
    const atConfigItem = getATConfigItem(assetConfig, x.assetTypeName);
    const maybeFields: readonly (fieldListPopupModels.Field | null)[] = [
        blackText('Order ID', x.orderID),
        formatOrderStatus(currentUserRole)[x.orderStatus],
        blackText('Asset', getAssetTypeLabel(assetConfig, x.assetTypeName)),
        blackText('Created on', x.createdOn),
        x.orderStatus === 'assetRegistered' || x.orderStatus === 'tokenMinted' ?
            (x.registeredOn ? blackText('Registered on', x.registeredOn) : null) :
            null,
        x.orderStatus === 'tokenMinted' ?
            (x.tokenizedOn ? blackText('Tokenized on', x.tokenizedOn) : null) :
            null,
        blackText('Amount', x.assetAmount.toString() + ' ' +
            (atConfigItem !== null ? atConfigItem.assetTypeUnit : '[ERROR: UNKNOWN ASSET TYPE]')
        ), // @todo: Might 
        blackText('Token', atConfigItem !== null ?
            (x.assetAmount * atConfigItem.assetToTokenExchangeRate).toString() + ' ' + atConfigItem.tokenTypeUnit :
            '[ERROR: UNKNOWN TOKEN TYPE]'
        ),
        blackText('Owner', x.assetOwnerID === currentUserID ? 'You' : x.assetOwnerID),
        formatAppointment('assetCustodian', currentUserID, x.assetCustodianID, x.assetCustodianAppointmentStatus),
        formatAppointment('tokenCreator', currentUserID, x.tokenCreatorID, x.tokenCreatorAppointmentStatus),
    ];
    return maybeFields.filter((x): x is fieldListPopupModels.Field => x !== null);
};

type ButtonCreator = <ID>(id: ID, onClick: (id: ID) => void) => dialogButtons.Button<ID>;

const buttonCreatorCreator =
    (type: 'primary' | 'secondary', label: string) =>
        <ID>(id: ID, onClick: (id: ID) => void): dialogButtons.Button<ID> =>
            ({ id, type, label, onClick });

export type ButtonID = 'cancel' | 'close' | 'cancelOrder' | 'registerAsset' | 'mintToken';

export const buttonCreators: { [P in ButtonID]: ButtonCreator } = {
    cancel: buttonCreatorCreator('secondary', 'CANCEL'),
    close: buttonCreatorCreator('secondary', 'CLOSE'),
    cancelOrder: buttonCreatorCreator('secondary', 'CANCEL ORDER'),
    registerAsset: buttonCreatorCreator('primary', 'REGISTER'),
    mintToken: buttonCreatorCreator('primary', 'MINT TOKEN'),
};

