import moment from 'moment';
import { ok } from '@local/result';
import * as mCfg from '@local/f-model/dist/config';
import * as mWallet from '@local/f-model/dist/groups/wallet/index';

import * as models from '../../../../systems/system1/models';
import * as table3Defs from '../../../../systems/system1Table3/defs';

// ---

export interface TableData {
    assetAndTokenConfig: mCfg.AssetAndTokenConfig;
};
export type RowData = mWallet.TokenTransaction;

export type Q = table3Defs.DefCreator<TableData, RowData>;

const formatNumberAsDate = (dateAsNumber: number): string => {
    return moment(dateAsNumber).format('MMM D, YYYY, h:mm:ss A');
};

const formatTokenTransferType = (tokenTransaction: mWallet.TokenTransaction): string => {
    switch (tokenTransaction.type) {
        case 'tokenTransfer': return 'Token transfer';
        case 'tokenMinting': return 'Token minting';
        case 'buyOrder' : return 'Buy order';
        case 'sellOrder' : return 'Sell order';
    }
    return '';
};

type ColID =
    'orderID' |
    'date' |
    'type' |
    'details' |
    'amount';

const x = 2;

const colDefs: Record<ColID, Q['column']> = {
    orderID: {
        column: {
            header: 'Order/Transaction ID',
            width: 285,
            widthMax: 360,
            widthGrow: 1,
            widthMin: 160,
            widthShrink: 1,
        },
        cellDef: (x) => ok(models.table3CellText(x.rowData.transactionID)),
    },

    date: {
        column: {
            header: 'Date',
            width: 175,
            widthMax: 250,
            widthGrow: 1,
            widthMin: 90,
            widthShrink: 1,
        },
        cellDef: (x) => ok({
            type: 'text',
            text: (x.rowData.date === null) ? 'not available' : formatNumberAsDate(x.rowData.date),
        }),
    },

    type: {
        column: {
            header: 'Type',
            width: 100,
            widthMax: 175,
            widthGrow: 1,
            widthMin: 60,
            widthShrink: 1,
        },
        cellDef: (x) => ok(
            models.table3CellText(
                formatTokenTransferType(x.rowData),
            ),
        ),
    },
    
    details: {
        column: {
            header: 'Details',
            width: 120,
            widthMax: 195,
            widthGrow: 1,
            widthMin: 70,
            widthShrink: 1,
        },
        cellDef: (x) => ok(models.table3CellText(x.rowData.details)),
    },

    amount: {
        column: {
            header: 'Amount',
            width: 90,
            widthMax: 165,
            widthGrow: 1,
            widthMin: 60,
            widthShrink: 1,
        },
        cellDef: (x) => {
            const tokenType = mCfg.assetAndTokenConfigGetItemByTokenTypeName(x.tableData.assetAndTokenConfig, x.rowData.tokenTypeName);
            const amount = x.rowData.amount;
            const tokenTypeUnit = tokenType.isOk ? (' ' + tokenType.ok.tokenTypeUnit) : '';
            return ok({
                type: 'text',
                text: `${amount > 0 ? '+' : ''}${amount}${tokenTypeUnit}`,
                color: amount >= 0 ? 'green' : 'red',

            });
        },
    },
};

export type TableID =
    'tokenTransactions';

export const tableDefs: Record<TableID, Q['table']> = {
    tokenTransactions: {
        columns: [
            colDefs.orderID,
            colDefs.date,
            colDefs.type,
            colDefs.details,
            colDefs.amount,
        ],
    },
};
