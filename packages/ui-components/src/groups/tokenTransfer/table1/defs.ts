import {
    ReadonlyTransferOrder,
} from '@local/f-model/dist/tokenTransfer';

import {
    AssetAndTokenConfig,
    assetAndTokenConfigGetItemByTokenTypeName,
} from '@local/f-model/dist/config';

import {
    ColumnDef,
    // RowDataAndProps,
    TableDef,
} from '../../../systems/system1Table1/defs';

export interface TableData {
    assetAndTokenConfig: AssetAndTokenConfig;
};
export type RowData = ReadonlyTransferOrder;
export type RowID = string
export type RowAction = 'view' | 'accept' | 'reject';

type ColumnID =
    'fromUserID' |
    'fromAccountIDIncoming' |
    'toUserID' |
    'toAccountIDOutgoing' |
    'transactionID' |
    'lastModified' |
    'tokenTypeLabel' |
    'amountOutgoing' |
    'amountIncoming' |
    'statusOutgoing' |
    'actionIncoming' |
    'actionOutgoing';

const columnDefs: Record<ColumnID, ColumnDef<TableData, RowData, RowID, RowAction>> = {
    fromUserID: {
        header: 'From',
        cell: (x) => ({
            type: 'text',
            // @todo: To change this to user ID once it is available
            text: x.rowData.fromOwnerID,
        }),
    },
    fromAccountIDIncoming: {
        header: 'Account ID',
        cell: (x) => ({
            type: 'text',
            text: x.rowData.fromAccountID,
        }),
    },
    toUserID: {
        header: 'To',
        cell: (x) => ({
            type: 'text',
            // @todo: To change this to user ID once it is available
            text: x.rowData.toOwnerID,
        }),
    },
    toAccountIDOutgoing: {
        header: 'Account ID',
        cell: (x) => ({
            type: 'text',
            text: x.rowData.toAccountID,
        }),
    },
    transactionID: {
        header: 'Transaction ID',
        cell: (x) => ({
            type: 'text',
            text: x.rowData.transactionID,
        }),
    },
    lastModified: {
        header: 'Last modified',
        cell: (x) => ({
            type: 'text',
            // @todo: To add last modified when available
            text: 'not available',
        }),
    },
    tokenTypeLabel: {
        header: 'Token',
        cell: (x) => {
            const tokenType = assetAndTokenConfigGetItemByTokenTypeName(x.tableData.assetAndTokenConfig, x.rowData.tokenTypeName);
            if (tokenType.isOk) {
                return {
                    type: 'text',
                    text: tokenType.ok.tokenTypeLabel,
                };
            } else {
                return {
                    type: 'text',
                    text: 'TOKEN TYPE NOT FOUND',
                    color: 'red',
                };
            }
        },
    },
    amountOutgoing: {
        header: 'Amount',
        cell: (x) => {
            const tokenType = assetAndTokenConfigGetItemByTokenTypeName(x.tableData.assetAndTokenConfig, x.rowData.tokenTypeName);
            if (tokenType.isOk) {
                return {
                    type: 'text',
                    text: `${-x.rowData.amount >= 0 ? '+' : '-'}${x.rowData.amount} ${tokenType.ok.tokenTypeUnit}`,
                    color: -x.rowData.amount >= 0 ? 'green' : 'red',
                };
            } else {
                return {
                    type: 'text',
                    text: `${-x.rowData.amount >= 0 ? '+' : '-'}${x.rowData.amount}`,
                    color: -x.rowData.amount >= 0 ? 'green' : 'red',
                };
            }
        },
    },
    amountIncoming: {
        header: 'Amount',
        cell: (x) => {
            const tokenType = assetAndTokenConfigGetItemByTokenTypeName(x.tableData.assetAndTokenConfig, x.rowData.tokenTypeName);
            if (tokenType.isOk) {
                return {
                    type: 'text',
                    text: `${x.rowData.amount >= 0 ? '+' : '-'}${x.rowData.amount} ${tokenType.ok.tokenTypeUnit}`,
                    color: x.rowData.amount >= 0 ? 'green' : 'red',
                };
            } else {
                return {
                    type: 'text',
                    text: `${x.rowData.amount >= 0 ? '+' : '-'}${x.rowData.amount}`,
                    color: x.rowData.amount >= 0 ? 'green' : 'red',
                };
            }
        },
    },
    statusOutgoing: {
        header: 'Status',
        cell: (x) => {
            switch (x.rowData.status) {
                case 'proposed': return { type: 'iconAndText', iconID: 'clock', text: 'Pending' };
                case 'accepted': return { type: 'text', text: 'Accepted' };
                case 'rejected': return { type: 'iconAndText', iconID: 'cross', text: 'Rejected', color: 'red' };
                case 'cancelled': return { type: 'text', text: 'Sender cancelled' };
            }
        },
    },
    actionIncoming: {
        header: 'Action',
        cell: (x) => {
            switch (x.rowData.status) {
                case 'proposed':
                    return {
                        type: 'buttons',
                        rowID: x.rowData.transactionID,
                        buttons: [
                            { label: 'Accept', rowAction: 'accept' },
                            { label: 'Reject', rowAction: 'reject' },
                        ],
                    };
                case 'accepted': return { type: 'text', text: 'Accepted' };
                case 'rejected': return { type: 'iconAndText', iconID: 'cross', text: 'Rejected', color: 'red' };
                case 'cancelled': return { type: 'text', text: 'Sender cancelled' };
            }
        },
    },
    actionOutgoing: {
        header: 'Action',
        cell: (x) => ({
            type: 'buttons',
            rowID: x.rowData.transactionID,
            buttons: [
                { label: 'View', rowAction: 'view' },
            ],
        }),
    },
};

export type TableID =
    'incomingTokenTransfers' |
    'outgoingTokenTransfers';

export const tableDefs: Record<TableID, TableDef<TableData, RowData, RowID, RowAction>> = {
    incomingTokenTransfers: {
        // title: 'Incoming Token Transfers',
        // tooltip: 'Token transferred to you from other users',
        columns: [
            columnDefs.fromUserID,
            columnDefs.fromAccountIDIncoming,
            columnDefs.transactionID,
            columnDefs.lastModified,
            columnDefs.tokenTypeLabel,
            columnDefs.amountIncoming,
            columnDefs.actionIncoming,
        ],
    },
    outgoingTokenTransfers: {
        // title: 'Outgoing Token Transfers',
        // tooltip: 'Token transferred from you to other users',
        columns: [
            columnDefs.toUserID,
            columnDefs.toAccountIDOutgoing,
            columnDefs.transactionID,
            columnDefs.lastModified,
            columnDefs.tokenTypeLabel,
            columnDefs.amountOutgoing,
            columnDefs.statusOutgoing,
            columnDefs.actionOutgoing,
        ],
    },
};
