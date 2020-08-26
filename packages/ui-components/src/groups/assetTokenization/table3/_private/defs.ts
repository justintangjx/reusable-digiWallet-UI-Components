import moment from 'moment';

import { ok, err } from '@local/result';

import {
    AssetAndTokenConfig,
    assetAndTokenConfigGetItemByAssetTypeName,
} from '@local/f-model/dist/config';

import {
    ReadonlyPurchaseOrder as PurchaseOrder,
} from '@local/f-model/dist/purchaseOrder';

import * as s1Table3Defs from '../../../../systems/system1Table3/defs';
import * as s1Table3 from '../../../../systems/system1/models/table3';

// ---

export type TableAction =
    'view' |
    'assetCustodianAccept' |
    'tokenCreatorAccept' |
    'register' |
    'mint' |
    // Cancel is not initiated in table
    // 'cancel' |
    'assetCustodianReject' |
    'tokenCreatorReject';

export interface TableData {
    assetAndTokenConfig: AssetAndTokenConfig;
    onAction: (x: { orderID: string, action: TableAction }) => void;
};
export type RowData = PurchaseOrder;

export type Q = s1Table3Defs.DefCreator<TableData, RowData>;

const formatNumberAsDate = (dateAsNumber: number): string => {
    return moment(dateAsNumber).format('MMM D, YYYY, h:mm:ss A');
};

type ColID =
    'orderID' |
    'assetOwnerID' |
    'lastModified' |
    'assetTypeLabel' |
    'assetAmount' |
    'orderStatus' |
    'actionForAssetTokenizationOrders' |
    'actionForAssetCustodianAppointments' |
    'actionForTokenCreatorAppointments' |
    'actionForAssetRegistrationOrders' |
    'actionForTokenMintingOrders';

const colDefs: Record<ColID, Q['column']> = {
    orderID: {
        column: {
            header: 'Order ID',
            width: 260,
            widthMax: 335,
            widthGrow: 1,
            widthMin: 145,
            widthShrink: 1,
        },
        cellDef: ({ rowData: purchaseOrder }) =>
            ok(s1Table3.cellText(purchaseOrder.orderID)),
    },
    assetOwnerID: {
        column: {
            header: 'Owner',
            width: 100,
            widthMax: 175,
            widthGrow: 1,
            widthMin: 65,
            widthShrink: 1,
        },
        cellDef: ({ rowData: purchaseOrder }) =>
            ok(s1Table3.cellText(purchaseOrder.assetOwnerID)),
    },
    assetTypeLabel: {
        column: {
            header: 'Asset',
            width: 50,
            widthMax: 125,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: ({ tableData: { assetAndTokenConfig }, rowData: purchaseOrder }) => {
            const assetTypeName = purchaseOrder.assetTypeName;
            const assetAndTokenConfigItem = assetAndTokenConfigGetItemByAssetTypeName(
                assetAndTokenConfig,
                assetTypeName,
            );
            if (!assetAndTokenConfigItem.isOk) {
                // @todo: To provide a sensible error message that we can use to debug
                return err('Error occurred');
            }
            const assetTypeLabel = assetAndTokenConfigItem.ok.assetTypeLabel;
            // ---
            return ok(s1Table3.cellText(assetTypeLabel));
        },
    },
    
    assetAmount: {
        column: {
            header: 'Amount',
            width: 100,
            widthMax: 175,
            widthGrow: 1,
            widthMin: 60,
            widthShrink: 1,
        },
        cellDef: ({ rowData: purchaseOrder, tableData: { assetAndTokenConfig } }) => {
            const assetTypeName = purchaseOrder.assetTypeName;
            let unit: string | null = null;
            for (const assetAndTokenConfigItem of assetAndTokenConfig) {
                if (assetAndTokenConfigItem.assetTypeName === assetTypeName) {
                    unit = assetAndTokenConfigItem.assetTypeUnit;
                    break;
                }
            }
            if (unit === null) {
                return err(`Asset type configuration not found for asset-type-name ${assetTypeName}.`);
            }
            const amount = purchaseOrder.assetAmount.toString();
            return ok(s1Table3.cellText(`${amount} ${unit}`));
        }
    },
    // @todo: To implement last modified column
    lastModified: {
        column: {
            header: 'Last modified',
            width: 175,
            widthMax: 250,
            widthGrow: 1,
            widthMin: 90,
            widthShrink: 1,
        },
        cellDef: ({ rowData: purchaseOrder}) =>
            ok(s1Table3.cellText(purchaseOrder.lastModified)),
    },

    // @todo: To add all required order status columns if they are different for each table
    orderStatus: {
        column: {
            header: 'Status',
            width: 100,
            widthMax: 175,
            widthGrow: 1,
            widthMin: 70,
            widthShrink: 1,
        },
        cellDef: ({ rowData: purchaseOrder }) => {
            switch (purchaseOrder.orderStatus) {
                // @todo: To return appropriate text and color (and icon+tooltip later) for each order status
                case 'orderCreated':
                    return ok(s1Table3.cellIconAndText({
                        icon: 'clock',
                        text: 'Order created',
                        tooltipText: 'Waiting for custodian and token creator to accept ',
                    }));
                case 'orderAccepted':
                    return ok(s1Table3.cellIconAndText({
                        icon: 'tick',
                        text: 'Order accepted',
                        tooltipText: 'Custodian and token creator accepted the appointment. Your order is being processed.',
                    }));
                case 'assetRegistered':
                    return ok(s1Table3.cellText('Asset registered'));
                case 'tokenMinted':
                    return ok(s1Table3.cellText('Asset tokenized'));
                case 'orderCancelled':
                    return ok(s1Table3.cellIconAndText({
                        icon: 'cross',
                        text: 'Order cancelled',
                        color: 'red',
                    }));
                case 'orderRejected':
                    return ok(s1Table3.cellIconAndText({
                        icon: 'cross',
                        text: 'Order failed',
                        color: 'red',
                    }));
                default:
                    return err(`Invalid order status ${purchaseOrder.orderStatus} for purchase order with order ID ${purchaseOrder.orderID}`);
            }
        },
    },

    // @todo: To implement all action columns
    actionForAssetTokenizationOrders: {
        column: {
            header: 'Action',
            width: 70,
            widthMax: 145,
            widthGrow: 1,
        },
        cellDef: ({ rowData: purchaseOrder, tableData: { onAction } }) =>
            ok(s1Table3.cellButtons([
                {
                    label: 'View',
                    onAction: () => {
                        onAction({ orderID: purchaseOrder.orderID, action: 'view' });
                    },
                },
            ])),
    },
    actionForAssetCustodianAppointments: {
        column: {
            header: 'Action',
            width: 100,
            widthMax: 150,
            widthGrow: 1,
        },
        cellDef: ({ rowData: purchaseOrder, tableData: { onAction } }) => {
            const orderID = purchaseOrder.orderID;
            switch (purchaseOrder.orderStatus) {
                case 'orderCreated':
                    switch (purchaseOrder.assetCustodianAppointmentStatus) {
                        case 'nominated': return ok(s1Table3.cellButtons([
                            {
                                label: 'Accept',
                                onAction: () => {
                                    onAction({ orderID, action: 'assetCustodianAccept' });
                                },
                            },
                            {
                                label: 'Reject',
                                onAction: () => {
                                    onAction({ orderID, action: 'assetCustodianReject' });
                                },
                            },
                        ]));
                        case 'nominationAccepted': return ok(s1Table3.cellText('Accepted'));
                        case 'nominationRejected': return ok(s1Table3.cellText('Rejected'));
                        // @todo: To provide a proper error message
                        default: return err('Unexpected error ');
                    }
                case 'orderAccepted': return ok(s1Table3.cellText('Accepted'));
                case 'assetRegistered': return ok(s1Table3.cellText('Accepted'));
                case 'tokenMinted': return ok(s1Table3.cellText('Accepted'));
                case 'orderCancelled': return ok(s1Table3.cellText('Owner cancelled'));
                case 'orderRejected':
                    if (purchaseOrder.tokenCreatorAppointmentStatus === 'nominationRejected') {
                        return ok(s1Table3.cellText('Token creator rejected'));
                    } else {
                        return ok(s1Table3.cellText('Rejected'));
                    }
            }
        },
    },
    actionForTokenCreatorAppointments: {
        column: {
            header: 'Action',
            width: 100,
            widthMax: 150,
            widthGrow: 1,
        },
        cellDef: ({ rowData: purchaseOrder, tableData: { onAction } }) => {
            const orderID = purchaseOrder.orderID;
            switch (purchaseOrder.orderStatus) {
                case 'orderCreated':
                    switch (purchaseOrder.tokenCreatorAppointmentStatus) {
                        case 'nominated': return ok(s1Table3.cellButtons([
                            {
                                label: 'Accept',
                                onAction: () => {
                                    onAction({ orderID, action: 'tokenCreatorAccept' });
                                },
                            },
                            {
                                label: 'Reject',
                                onAction: () => {
                                    onAction({ orderID, action: 'tokenCreatorReject' });
                                },
                            },
                        ]));
                        case 'nominationAccepted': return ok(s1Table3.cellText('Accepted'));
                        case 'nominationRejected': return ok(s1Table3.cellText('Rejected'));
                        // @todo: To provide a proper error message
                        default: return err('Unexpected error ');
                    }
                case 'orderAccepted': return ok(s1Table3.cellText('Accepted'));
                case 'assetRegistered': return ok(s1Table3.cellText('Accepted'));
                case 'tokenMinted': return ok(s1Table3.cellText('Accepted'));
                case 'orderCancelled': return ok(s1Table3.cellText('Owner cancelled'));
                case 'orderRejected':
                    if (purchaseOrder.assetCustodianAppointmentStatus === 'nominationRejected') {
                        return ok(s1Table3.cellText('Asset custodian rejected'));
                    } else {
                        return ok(s1Table3.cellText('Rejected'));
                    }
            }
        },
    },
    actionForAssetRegistrationOrders: {
        column: {
            header: 'Action',
            width: 80,
            widthMax: 155,
            widthGrow: 1,
        },
        cellDef: ({ rowData: { orderID, orderStatus }, tableData: { onAction } }) => {
            switch (orderStatus) {
                case 'orderAccepted': return ok(s1Table3.cellButtons([
                    {
                        label: 'Register',
                        onAction: () => {
                            onAction({ orderID: orderID, action: 'register' });
                        },
                    },
                ]));
                default: return ok(s1Table3.cellButtons([
                    {
                        label: 'View',
                        onAction: () => {
                            onAction({ orderID: orderID, action: 'view' });
                        },
                    },
                ]));
            }
        },
    },
    actionForTokenMintingOrders: {
        column: {
            header: 'Action',
            width: 85,
            widthMax: 160,
            widthGrow: 1,
        },
        cellDef: ({ rowData: { orderID, orderStatus }, tableData: { onAction } }) => {
            switch (orderStatus) {
                case 'assetRegistered': return ok(s1Table3.cellButtons([
                    {
                        label: 'Mint token',
                        onAction: () => {
                            onAction({ orderID: orderID, action: 'mint' });
                        },
                    },
                ]));
                default: return ok(s1Table3.cellButtons([
                    {
                        label: 'View',
                        onAction: () => {
                            onAction({ orderID: orderID, action: 'view' });
                        },
                    },
                ]));
            }
        },
    },
};

export type TableID =
    'assetTokenizationOrders' |
    'assetCustodianAppointments' |
    'tokenCreatorAppointments' |
    'assetRegistrationOrders' |
    'tokenMintingOrders';

// @todo: To add appropriate columns to every table
export const tableDefs: Record<TableID, Q['table']> = {
    assetTokenizationOrders: {
        columns: [
            colDefs.orderID,
            colDefs.lastModified,
            colDefs.assetTypeLabel,
            colDefs.assetAmount,
            colDefs.orderStatus,
            colDefs.actionForAssetTokenizationOrders,
        ],
    },
    assetCustodianAppointments: {
        columns: [
            colDefs.assetOwnerID,
            colDefs.orderID,
            colDefs.lastModified,
            colDefs.assetTypeLabel,
            colDefs.assetAmount,
            colDefs.actionForAssetCustodianAppointments,
        ],
    },
    tokenCreatorAppointments: {
        columns: [
            colDefs.assetOwnerID,
            colDefs.orderID,
            colDefs.lastModified,
            colDefs.assetTypeLabel,
            colDefs.assetAmount,
            colDefs.actionForTokenCreatorAppointments,
        ],
    },
    assetRegistrationOrders: {
        columns: [
            colDefs.orderID,
            colDefs.lastModified,
            colDefs.assetTypeLabel,
            colDefs.assetAmount,
            colDefs.orderStatus,
            colDefs.actionForAssetRegistrationOrders,
        ],
    },
    tokenMintingOrders: {
        columns: [
            colDefs.orderID,
            colDefs.lastModified,
            colDefs.assetTypeLabel,
            colDefs.assetAmount,
            colDefs.orderStatus,
            colDefs.actionForTokenMintingOrders,
        ],
    },
};
