import * as dataModels from '@local/f-model/dist/purchaseOrder';
import * as uiModels from './PurchaseOrderTable/index';

// ---

export type Role = 'assetOwner' | 'assetCustodian' | 'tokenCreator';

const orderStatusFormatCommon: Pick<Record<dataModels.OrderStatus, uiModels.CellProps<any>>, 'orderCancelled' | 'orderRejected' | 'assetRegistered' | 'tokenMinted'> = {
    orderCancelled: { type: 'iconAndText', color: 'red', iconID: 'x', text: 'Order cancelled' },
    orderRejected: { type: 'iconAndText', color: 'red', iconID: 'x', text: 'Order failed' },
    assetRegistered: { type: 'text', color: 'black', text: 'Asset registered' },
    tokenMinted: { type: 'text', color: 'black', text: 'Asset tokenized' },
};

export const formatOrderStatus: Record<Role, Record<dataModels.OrderStatus, uiModels.CellProps<any>>> = {
    assetOwner: {
        ...orderStatusFormatCommon,
        orderCreated: {
            type: 'iconAndText',
            color: 'black',
            iconID: 'clock',
            text: 'Order created',
            tooltipText: 'Waiting for custodian and token creator to accept appointment.',
        },
        orderAccepted: {
            type: 'iconAndText',
            color: 'black',
            iconID: 'tick',
            text: 'Order accepted',
            tooltipText: 'Custodian and token creator accepted the appointment. Your order is being processed.',
        },
    },
    assetCustodian: {
        ...orderStatusFormatCommon,
        orderCreated: {
            type: 'iconAndText',
            color: 'black',
            iconID: 'clock',
            text: 'Order created',
            tooltipText: 'Waiting for token creator to accept the appointment.',
        },
        orderAccepted: {
            type: 'iconAndText',
            color: 'black',
            iconID: 'tick',
            text: 'Order accepted',
            tooltipText: 'Token creator has accepted the appointment. You can now register the asset.'
        },
    },
    tokenCreator: {
        ...orderStatusFormatCommon,
        orderCreated: {
            type: 'iconAndText',
            color: 'black',
            iconID: 'clock',
            text: 'Order created',
            tooltipText: 'Waiting for custodian to accept the appointment',
        },
        orderAccepted: {
            type: 'iconAndText',
            color: 'black',
            iconID: 'tick',
            text: 'Order accepted',
            tooltipText: 'Custodian has accepted the appointment. Asset registration is in progress. You can mint token once the asset is registered.',
        },
    },
};
