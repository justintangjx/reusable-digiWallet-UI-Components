import * as mWallet from '@local/f-model/dist/groups/wallet/index';

import * as mConfig from '@local/f-model/dist/config';

import moment from 'moment';

import {
    ColumnDef,
    TableDef,
} from '../../../systems/system1Table1/defs';

// ---

const formatTokenTransferType = (tokenTransaction: mWallet.TokenTransaction): string => {
    switch (tokenTransaction.type) {
        case 'tokenTransfer': return 'Token transfer';
        case 'tokenMinting': return 'Token minting';
    }
    return '';
};

const formatNumberAsDate = (dateAsNumber: number): string => {
    return moment(dateAsNumber).format('MMM D, YYYY, h:mm:ss A');
};


export interface TableData {
    assetAndTokenConfig: mConfig.AssetAndTokenConfig;
};
export type RowID = string;
export type RowData = mWallet.TokenTransaction;
export type RowAction = null;

type ColumnID =
    'orderID' |
    'date' |
    'type' |
    'details' |
    'amount';

const columnDefs: Record<ColumnID, ColumnDef<TableData, RowData, RowID, RowAction>> = {
    orderID: {
        header: 'Order/Transaction ID',
        cell: (x) => ({
            type: 'text',
            text: x.rowData.transactionID,
        }),
    },
    date: {
        header: 'Date',
        cell: (x) => ({
            type: 'text',
            text: (x.rowData.date === null) ? 'not available' : formatNumberAsDate(x.rowData.date),
        }),
    },
    type: {
        header: 'Type',
        cell: (x) => ({
            type: 'text',
            text: formatTokenTransferType(x.rowData),
        }),
    },
    details: {
        header: 'Details',
        cell: (x) => ({
            type: 'text',
            text: x.rowData.details,
        }),
    },
    amount: {
        header: 'Amount',
        cell: (x) => {
            const tokenType = mConfig.assetAndTokenConfigGetItemByTokenTypeName(x.tableData.assetAndTokenConfig, x.rowData.tokenTypeName);
            const amount = x.rowData.amount;
            const tokenTypeUnit = tokenType.isOk ? (' ' + tokenType.ok.tokenTypeUnit) : '';
            return {
                type: 'text',
                text: `${amount >= 0 ? '+' : '-'}${amount}${tokenTypeUnit}`,
                color: amount >= 0 ? 'green' : 'red',
            };
        },
    },
};

export type TableID =
    'tokenTransactions';

export const tableDefs: Record<TableID, TableDef<TableData, RowData, RowID, RowAction>> = {
    tokenTransactions: {
        columns: [
            columnDefs.orderID,
            columnDefs.date,
            columnDefs.type,
            columnDefs.details,
            columnDefs.amount,
        ],
    },
};
