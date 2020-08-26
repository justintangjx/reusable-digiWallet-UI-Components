// import * as uiModels from '../PurchaseOrderTable/index';

// ---

import { AssetAndTokenConfig } from '@local/f-model/dist/config';
import { ReadonlyPurchaseOrder, TableID } from '@local/f-model/dist/purchaseOrder';
import {
    // CellPropsButton,
    CellProps as TableCellProps,
} from './PurchaseOrderTable/index';
// import { Cell as CellComponent } from './PurchaseOrderTable/Cell';
import { Role, formatOrderStatus } from './helpersOrderStatus';

// ---

export interface RowData<OrderActionID> {
    readonly role: Role;
    readonly assetAndTokenConfig: AssetAndTokenConfig;
    readonly purchaseOrder: ReadonlyPurchaseOrder;
    readonly onAction: (orderID: string, actionID: OrderActionID) => void;
}

export type CellParams<OrderActionID> = (rowProps: RowData<OrderActionID>, isFirstcolumn?: boolean) => TableCellProps<OrderActionID>;

export interface ColumnParams<OrderActionID> {
    readonly header: string;
    readonly cell: CellParams<OrderActionID>;
}

export interface TableParams<OrderActionID> {
    readonly role: Role;
    readonly title: string;
    readonly tableTooltip?: string;
    readonly onOrderStatusInfoPopup?: boolean;
    readonly columns: readonly ColumnParams<OrderActionID>[];
}

// const inferRecord = <Value>() => <P extends string>(x: { [P1 in P]: Value }) => x;

type ColumnID = 'orderID' | 'assetOwnerID' | 'lastModified' | 'assetTypeLabel' | 'assetAmount' | 'orderStatus';
const columnConfigs: Record<ColumnID, ColumnParams<any>> = {

    orderID: {
        header: 'Order ID',
        cell: ({ purchaseOrder }, isFirstColumn) =>
            ({ type: 'text', text: purchaseOrder.orderID, color: isFirstColumn ? 'black-first-cell-in-row' : 'black' }),
    },

    assetOwnerID: {
        header: 'Owner',
        cell: ({ purchaseOrder }, isFirstColumn) =>
            ({ type: 'text', text: purchaseOrder.assetOwnerID, color: isFirstColumn ? 'black-first-cell-in-row' : 'black' }),
    },

    lastModified: {
        header: 'Last modified',
        // @todo: To handle first column case
        cell: ({ purchaseOrder }) =>
            // @todo: To add last-modified cell text when time is availbale from blockchain
            ({ type: 'text', text: purchaseOrder.lastModified, color: 'black' }),
    },

    assetTypeLabel: {
        header: 'Asset',
        cell:
            // @todo: To handle first column case
            ({ assetAndTokenConfig, purchaseOrder }, isFirstColumn) => {
                const assetTypeName = purchaseOrder.assetTypeName;
                for (const configItem of assetAndTokenConfig) {
                    if (assetTypeName == configItem.assetTypeName) {
                        return { type: 'text', text: configItem.assetTypeLabel, color: isFirstColumn ? 'black-first-cell-in-row' : 'black' };
                    }
                }
                // @todo: To do error formatting properly
                return { type: 'text', text: assetTypeName + ' [ERROR: The asset type was not found in the config. This is the asset type name.]', color: 'red' };
            },
    },

    assetAmount: {
        header: 'Amount',
        cell: ({ assetAndTokenConfig, purchaseOrder }, isFirstColumn) => {
            // @todo: Might need to format the number to a certain fixed or max precision
            const assetTypeName = purchaseOrder.assetTypeName;
            for (const configItem of assetAndTokenConfig) {
                if (assetTypeName == configItem.assetTypeName) {
                    return {
                        type: 'text',
                        text: purchaseOrder.assetAmount.toString() + ' ' + configItem.assetTypeUnit,
                        color: isFirstColumn ? 'black-first-cell-in-row' : 'black',
                    };
                }
            }
            // @todo: To do error formatting properly
            return {
                type: 'text',
                text: purchaseOrder.assetAmount.toString() + ' [ERROR: The asset type was not found in the config]',
                color: 'red',
            };
        },
    },

    orderStatus: {
        header: 'Status',
        // @todo: To handle first column case
        cell: ({ role, purchaseOrder }) =>
            formatOrderStatus[role][purchaseOrder.orderStatus],
    },

};

// const cellConfig = <ActionID>(buttons: readonly { buttonID: ActionID, label: string }[]) => {
//     return ({ purchaseOrder, onAction }) => ({
//         type: 'buttons',
//         rowID: purchaseOrder.orderID,
//         buttons: buttons,
//         onClick: onAction,
//     });
// };

// const id = <T>(id: T): T => id;
const columnParamsButtonsCell = <ActionID>(buttons: readonly { buttonID: ActionID, label: string }[]): ColumnParams<ActionID> =>
    ({
        header: 'Action',
        // @todo: To handle first column case?
        cell: ({ purchaseOrder, onAction }) => ({
            type: 'buttons',
            rowID: purchaseOrder.orderID,
            buttons: buttons,
            onClick: onAction,
        }),
    });

// ---

export const assetTokenizationOrdersTableParams: TableParams<'view'> = {
    role: 'assetOwner',
    title: 'Asset Tokenization Orders',
    tableTooltip: 'The asset tokenization orders created will be here. Click to view the order details.',
    onOrderStatusInfoPopup: true,
    columns: [
        columnConfigs.orderID,
        columnConfigs.lastModified,
        columnConfigs.assetTypeLabel,
        columnConfigs.assetAmount,
        columnConfigs.orderStatus,
        columnParamsButtonsCell([
            { buttonID: 'view', label: 'View' },
        ]),
    ],
};

export const assetCustodianAppointmentTableParams: TableParams<'accept' | 'reject'> = {
    role: 'assetCustodian',
    title: 'Appointments',
    columns: [
        columnConfigs.assetOwnerID,
        columnConfigs.orderID,
        columnConfigs.lastModified,
        columnConfigs.assetTypeLabel,
        columnConfigs.assetAmount,
        {
            header: 'Action',
            cell: ({ purchaseOrder, onAction }) => {
                switch (purchaseOrder.assetCustodianAppointmentStatus) {
                    case 'nominated':
                        if (purchaseOrder.orderStatus === 'orderCancelled')
                            return { type: 'text', color: 'black', text: 'Owner canceled' };
                        if (purchaseOrder.tokenCreatorAppointmentStatus === 'nominationRejected')
                            return { type: 'text', color: 'black', text: 'Token creator rejected' };
                        return {
                            type: 'buttons',
                            rowID: purchaseOrder.orderID,
                            buttons: [
                                { buttonID: 'accept', label: 'Accept' },
                                { buttonID: 'reject', label: 'Reject' },
                            ],
                            onClick: onAction,
                        };
                    case 'nominationRejected': return { type: 'text', color: 'black', text: 'Rejected' };
                    case 'nominationAccepted': return { type: 'text', color: 'black', text: 'Accepted' };
                }
            },
        },
    ],
};

export const tokenCreatorAppointmentTableParams: TableParams<'accept' | 'reject'> = {
    role: 'tokenCreator',
    title: 'Appointments',
    columns: [
        columnConfigs.assetOwnerID,
        columnConfigs.orderID,
        columnConfigs.lastModified,
        columnConfigs.assetTypeLabel,
        columnConfigs.assetAmount,
        {
            header: 'Action',
            cell: ({ purchaseOrder, onAction }) => {
                switch (purchaseOrder.tokenCreatorAppointmentStatus) {
                    case 'nominated':
                        if (purchaseOrder.orderStatus === 'orderCancelled')
                            return { type: 'text', color: 'black', text: 'Owner canceled' };
                        if (purchaseOrder.assetCustodianAppointmentStatus === 'nominationRejected')
                            return { type: 'text', color: 'black', text: 'Asset custodian rejected' };
                        return {
                            type: 'buttons',
                            rowID: purchaseOrder.orderID,
                            buttons: [
                                { buttonID: 'accept', label: 'Accept' },
                                { buttonID: 'reject', label: 'Reject' },
                            ],
                            onClick: onAction,
                        };
                    case 'nominationRejected': return { type: 'text', color: 'black', text: 'Rejected' };
                    case 'nominationAccepted': return { type: 'text', color: 'black', text: 'Accepted' };
                }
            },
        },
    ],
};

export const assetRegistrationOrdersTableParams: TableParams<'view' | 'register'> = {
    role: 'assetCustodian',
    title: 'Asset Registration Orders',
    tableTooltip: 'The asset that needs to be registered will be here. Click to view the order details.',
    onOrderStatusInfoPopup: true,
    columns: [
        columnConfigs.orderID,
        columnConfigs.lastModified,
        columnConfigs.assetTypeLabel,
        columnConfigs.assetAmount,
        columnConfigs.orderStatus,
        {
            header: 'Action',
            cell: ({ purchaseOrder, onAction }) => {
                if (purchaseOrder.orderStatus === 'orderAccepted')
                    return {
                        type: 'buttons',
                        rowID: purchaseOrder.orderID,
                        buttons: [
                            { buttonID: 'register', label: 'Register' },
                        ],
                        onClick: onAction,
                    };
                return {
                    type: 'buttons',
                    rowID: purchaseOrder.orderID,
                    buttons: [
                        { buttonID: 'view', label: 'View' },
                    ],
                    onClick: onAction,
                };
            },
        },
    ],
};

export const tokenMintingOrdersTableParams: TableParams<'view' | 'mintToken'> = {
    role: 'tokenCreator',
    title: 'Token Minting Orders',
    tableTooltip: 'The asset that needs to be tokenized will be here. Click to view the order details.',
    onOrderStatusInfoPopup: true,
    columns: [
        columnConfigs.orderID,
        columnConfigs.lastModified,
        columnConfigs.assetTypeLabel,
        columnConfigs.assetAmount,
        columnConfigs.orderStatus,
        {
            header: 'Action',
            cell: ({ purchaseOrder, onAction }) => {
                if (purchaseOrder.orderStatus === 'assetRegistered')
                    return {
                        type: 'buttons',
                        rowID: purchaseOrder.orderID,
                        buttons: [
                            { buttonID: 'mintToken', label: 'Mint token' },
                        ],
                        onClick: onAction,
                    };
                return {
                    type: 'buttons',
                    rowID: purchaseOrder.orderID,
                    buttons: [
                        { buttonID: 'view', label: 'View' },
                    ],
                    onClick: onAction,
                };
            },
        },
    ],
};
