import { ok, err } from '@local/result';

import moment from 'moment';

import * as mCfg from '@local/f-model/dist/config';
import { Order } from '@local/f-model/dist/v3/groups/assetDeregistration/index';

import * as t3 from '../../../../systems/system1/models/table3';
import * as table3Defs from '../../../../systems/system1Table3/defs';

// ---

const cellText = t3.cellText;
const cellIconAndText = t3.cellIconAndText;
const cellButtons = t3.cellButtons;
const cellButton = (button: t3.CellButtonsButton) => cellButtons([button]);

// ---

export type TableAction =
    'view' |
    'tokenBurnerRejectAppointment' |
    'tokenBurnerAcceptAppointment' |
    'assetDeregistrarRejectAppointment' |
    'assetDeregistrarAcceptAppointment' |
    'burnToken' |
    'deregisterAsset';

export type TblData = {
    assetAndTokenConfig: mCfg.AssetAndTokenConfig;
    onAction: (x: { order: Order, action: TableAction }) => void;
};
export type RowData = Order;

export type Q = table3Defs.DefCreator<TblData, RowData>;

const formatNumberAsDate = (dateAsNumber: number): string => {
    return moment(dateAsNumber).format('MMM D, YYYY, h:mm:ss A');
};

const formatOrderStatus = (order: Order): t3.CellText => {
    switch (order.orderStatus) {
        case 'orderCreated': return cellIconAndText({ icon: 'clock', text: 'Order created' });
        case 'orderCancelled': return cellIconAndText({ icon: 'cross', text: 'Order cancelled', color: 'red' });
        case 'orderRejected': return cellIconAndText({ icon: 'cross', text: 'Order failed', color: 'red' });
        case 'orderAccepted': return cellIconAndText({ icon: 'tick', text: 'Order accepted' });
        case 'tokenBurned': return cellIconAndText({ icon: 'tick', text: 'Token burned' });
        case 'assetDeregistered': return cellIconAndText({ icon: 'tick', text: 'Asset deregistered' });
    }
};

type ColID =
    'orderID' |
    // ---
    'creator' |
    'tokenBurner' |
    'assetDeregistrar' |
    // ---
    'tokenType' |
    'amount' |
    // ---
    'status' |
    'lastModified' |
    // ---
    'actionForTokenRedemptionOrders' |
    'actionForTokenBurnerAppointments' |
    'actionForAssetDeregistrarAppoinmtents' |
    'actionForBurnToken' |
    'actionForDeregisterAssets';


const colDefs: Record<ColID, Q['column']> = {
    orderID: {
        column: {
            header: 'Order ID',
            width: 200,
            widthMax: 350,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => ok(cellText(x.rowData.orderID)),
    },
    // ---
    creator: {
        column: {
            header: 'Owner',
            width: 200,
            widthMax: 350,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => ok(cellText(x.rowData.creatorID)),
    },
    tokenBurner: {
        column: {
            header: 'Token burner',
            width: 200,
            widthMax: 350,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => ok(cellText(x.rowData.tokenBurnerID)),
    },
    assetDeregistrar: {
        column: {
            header: 'Asset custodian',
            width: 200,
            widthMax: 350,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => ok(cellText(x.rowData.assetDeregistrarID)),
    },
    // ---
    status: {
        column: {
            header: 'Status',
            width: 200,
            widthMax: 220,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => ok(formatOrderStatus(x.rowData)),
    },
    lastModified: {
        column: {
            header: 'Date',
            width: 200,
            widthMax: 220,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => ok(cellText('Not available')),
    },
    tokenType: {
        column: {
            header: 'Token',
            width: 200,
            widthMax: 220,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => {
            const assetTypeName = x.rowData.assetTypeName;
            const tokenTypeConfigResult = mCfg.assetAndTokenConfigC(x.tableData.assetAndTokenConfig).getByAssetTypeName(assetTypeName);
            if (!tokenTypeConfigResult.isOk) return err(`Config for asset type name [${assetTypeName}] was not found.`);
            return ok(cellText(tokenTypeConfigResult.ok.tokenTypeLabel));
        },
    },
    amount: {
        column: {
            header: 'Amount',
            width: 200,
            widthMax: 220,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => {
            const assetTypeName = x.rowData.assetTypeName;
            const tokenTypeConfigResult = mCfg.assetAndTokenConfigC(x.tableData.assetAndTokenConfig).getByAssetTypeName(assetTypeName);
            if (!tokenTypeConfigResult.isOk) return err(`Config for asset type name [${assetTypeName}] was not found.`);
            const tokenTypeUnit = tokenTypeConfigResult.ok.tokenTypeUnit;
            const amount = x.rowData.assetValue.toLocaleString();
            return ok(cellText(`${amount} ${tokenTypeUnit}`));
        },
    },
    // ---
    actionForTokenRedemptionOrders: {
        column: {
            header: 'Action',
            width: 140,
            widthMax: 150,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => {
            switch (x.rowData.orderStatus) {
                case 'orderCreated':
                case 'orderCancelled':
                case 'orderRejected':
                case 'orderAccepted':
                    return ok(cellButton({
                        label: 'View',
                        onAction: () => x.tableData.onAction({ order: x.rowData, action: 'view' }),
                    }));
                case 'tokenBurned':
                case 'assetDeregistered':
                    return ok(cellButton({
                        label: 'Redemption receipt',
                        onAction: () => x.tableData.onAction({ order: x.rowData, action: 'view' }),
                    }));
            }
        },
    },
    actionForTokenBurnerAppointments: {
        column: {
            header: 'Action',
            width: 140,
            widthMax: 150,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => {
            const order = x.rowData;
            switch (order.orderStatus) {
                case 'orderCreated':
                    if (order.tokenBurnerAppointmentStatus === 'nominated')
                        return ok(cellButtons([
                            {
                                label: 'Accept',
                                onAction: () => x.tableData.onAction({ order: x.rowData, action: 'tokenBurnerAcceptAppointment' }),
                            },
                            {
                                label: 'Reject',
                                onAction: () => x.tableData.onAction({ order: x.rowData, action: 'tokenBurnerRejectAppointment' }),
                            },
                        ]));
                    else return ok(cellText('Accepted'));
                case 'orderCancelled':
                    return ok(cellText('Owner cancelled'));
                case 'orderRejected':
                    if (order.assetDeregistrarAppointmentStatus === 'rejected')
                        return ok(cellText('Asset custodian rejected'));
                    return ok(cellText('Rejected'));
                case 'orderAccepted':
                case 'tokenBurned':
                case 'assetDeregistered':
                    return ok(cellText('Accepted'));
            }
        },
    },
    actionForAssetDeregistrarAppoinmtents: {
        column: {
            header: 'Action',
            width: 140,
            widthMax: 150,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => {
            const order = x.rowData;
            switch (order.orderStatus) {
                case 'orderCreated':
                    if (order.assetDeregistrarAppointmentStatus === 'nominated')
                        return ok(cellButtons([
                            {
                                label: 'Accept',
                                onAction: () => x.tableData.onAction({ order: x.rowData, action: 'assetDeregistrarAcceptAppointment' }),
                            },
                            {
                                label: 'Reject',
                                onAction: () => x.tableData.onAction({ order: x.rowData, action: 'assetDeregistrarRejectAppointment' }),
                            },
                        ]));
                    else return ok(cellText('Accepted'));
                case 'orderCancelled':
                    return ok(cellText('Owner cancelled'));
                case 'orderRejected':
                    if (order.tokenBurnerAppointmentStatus === 'rejected')
                        return ok(cellText('Token burner rejected'));
                    return ok(cellText('Rejected'));
                case 'orderAccepted':
                case 'tokenBurned':
                case 'assetDeregistered':
                    return ok(cellText('Accepted'));
            }
        },
    },
    actionForBurnToken: {
        column: {
            header: 'Action',
            width: 140,
            widthMax: 150,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => {
            const order = x.rowData;
            const cellBurnToken = ok(cellButton({
                label: 'Burn token',
                onAction: () => x.tableData.onAction({ order: x.rowData, action: 'burnToken' }),
            }));
            const cellViewButton = ok(cellButton({
                label: 'View',
                onAction: () => x.tableData.onAction({ order: x.rowData, action: 'view' }),
            }));
            switch (order.orderStatus) {
                case 'orderCreated':
                case 'orderCancelled':
                case 'orderRejected': return cellViewButton;
                case 'orderAccepted': return cellBurnToken;
                case 'tokenBurned':
                case 'assetDeregistered': return cellViewButton;
            }
        },
    },
    actionForDeregisterAssets: {
        column: {
            header: 'Action',
            width: 140,
            widthMax: 150,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => {
            const order = x.rowData;
            const cellViewButton = ok(cellButton({
                label: 'View',
                onAction: () => x.tableData.onAction({ order: x.rowData, action: 'view' }),
            }));
            const cellDeregister = ok(cellButton({
                label: 'Deregister',
                onAction: () => x.tableData.onAction({ order: x.rowData, action: 'deregisterAsset' }),
            }));
            switch (order.orderStatus) {
                case 'orderCreated':
                case 'orderCancelled':
                case 'orderRejected':
                case 'orderAccepted': return cellViewButton;
                case 'tokenBurned': return cellDeregister;
                case 'assetDeregistered': return cellViewButton;
            }
        },
    },
};

export type TableID =
    'tokenRedemptionOrders' |
    'tokenBurnerAppointments' |
    'assetDeregistrarAppointments' |
    'burnToken' |
    'deregisterAssets';

export const tableDefs: Record<TableID, Q['table']> = {
    tokenRedemptionOrders: {
        columns: [
            colDefs.orderID,
            colDefs.lastModified,
            colDefs.tokenType,
            colDefs.amount,
            colDefs.status,
            colDefs.actionForTokenRedemptionOrders,
        ],
    },
    tokenBurnerAppointments: {
        columns: [
            colDefs.creator,
            colDefs.orderID,
            colDefs.lastModified,
            colDefs.tokenType,
            colDefs.amount,
            colDefs.assetDeregistrar,
            colDefs.actionForTokenBurnerAppointments,
        ],
    },
    assetDeregistrarAppointments: {
        columns: [
            colDefs.creator,
            colDefs.orderID,
            colDefs.lastModified,
            colDefs.tokenType,
            colDefs.amount,
            colDefs.tokenBurner,
            colDefs.actionForAssetDeregistrarAppoinmtents,
        ],
    },
    burnToken: {
        columns: [ 
            colDefs.orderID,
            colDefs.lastModified,
            colDefs.tokenType,
            colDefs.amount,
            colDefs.status,
            colDefs.actionForBurnToken,
        ],
    },
    deregisterAssets: {
        columns: [ 
            colDefs.orderID,
            colDefs.lastModified,
            colDefs.tokenType,
            colDefs.amount,
            colDefs.status,
            colDefs.actionForDeregisterAssets,
        ],
    },
};
