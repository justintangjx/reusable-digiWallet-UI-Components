import { ok, err } from '@local/result';

import {
    ReadonlyTransferOrder,
    ReadonlyTransferOrder as Order,
} from '@local/f-model/dist/tokenTransfer';

import {
    AssetAndTokenConfig,
    assetAndTokenConfigGetItemByTokenTypeName,

} from '@local/f-model/dist/config';

import moment from 'moment';

import * as s1T3 from '../../../../systems/system1/models/table3';
import * as table3Defs from '../../../../systems/system1Table3/defs';

// ---

export type TableAction = 'accept' | 'reject'| 'view';
export type OnAction = (x: { order: Order, action: TableAction }) => void;


export interface TableData {
    assetAndTokenConfig: AssetAndTokenConfig;
    onAction: OnAction;
};
export type RowData = ReadonlyTransferOrder;

export type Q = table3Defs.DefCreator<TableData, RowData>;

const formatNumberAsDate = (dateAsNumber: number): string => {
    return moment(dateAsNumber).format('MMM D, YYYY, h:mm:ss A');
};

type ColID =
    'fromUserID' |
    'fromAccountIDIncoming' |
    // 'submitTime' |
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

const colDefs: Record<ColID, Q['column']> = {
    fromUserID: {
        column: {
            header: 'From',
            width: 140,
            widthMax: 215,
            widthGrow: 1,
            widthMin: 75,
            widthShrink: 1,
        },
        cellDef: (x) => ok(s1T3.cellText(x.rowData.fromOwnerID)),
    },
    fromAccountIDIncoming: {
        column: {
            header: 'Account ID',
            width: 200,
            widthMax: 275,
            widthGrow: 1,
            widthMin: 120,
            widthShrink: 1,
        },
        cellDef: (x) => ok(s1T3.cellText(x.rowData.fromAccountID)),
    },
    toUserID: {
        column: {
            header: 'To',
            width: 140,
            widthMax: 215,
            widthGrow: 1,
            widthMin: 75,
            widthShrink: 1,
        },
        cellDef: (x) => ok(s1T3.cellText(x.rowData.toOwnerID)),
    },
    toAccountIDOutgoing: {
        column: {
            header: 'Account ID',
            width: 285,
            widthMax: 360,
            widthGrow: 1,
            widthMin: 160,
            widthShrink: 1,
        },
        cellDef: (x) => ok(s1T3.cellText(x.rowData.toAccountID)),
    },
    transactionID: {
        column: {
            header: 'Transaction ID',
            width: 285,
            widthMax: 360,
            widthGrow: 1,
            widthMin: 160,
            widthShrink: 1,
        },
        cellDef: (x) => ok(s1T3.cellText(x.rowData.transactionID)),
    },
    lastModified: {
        column: {
            header: 'Last modified',
            width: 175,
            widthMax: 250,
            widthGrow: 1,
            widthMin: 90,
            widthShrink: 1,
        },
        cellDef: (x) => ok(s1T3.cellText('not available')),
    },
    tokenTypeLabel: {
        column: {
            header: 'Token',
            width: 95,
            widthMax: 170,
            widthGrow: 1,
            widthMin: 65,
            widthShrink: 1,
        },
        cellDef: (x) => {
            const tokenType = assetAndTokenConfigGetItemByTokenTypeName(x.tableData.assetAndTokenConfig, x.rowData.tokenTypeName);
            if (!tokenType.isOk) {
                return err('error occured');
            }
            return ok(s1T3.cellText(tokenType.ok.tokenTypeLabel));
        },
    },
    amountOutgoing: {
        column: {
            header: 'Amount',
            width: 100,
            widthMax: 175,
            widthGrow: 1,
            widthMin: 60,
            widthShrink: 1,
        },
        cellDef: (x) => {
            const tokenType = assetAndTokenConfigGetItemByTokenTypeName(x.tableData.assetAndTokenConfig, x.rowData.tokenTypeName);
            if (!tokenType.isOk) {
                return err('error occured');
            }
            return ok(s1T3.cellText(
                `${-x.rowData.amount >= 0 ? '+' : '-'}${x.rowData.amount} ${tokenType.ok.tokenTypeUnit}`,
                { color: -x.rowData.amount >= 0 ? 'green' : 'red' },
            ));
        },
    },
    amountIncoming: {
        column: {
            header: 'Amount',
            width: 100,
            widthMax: 175,
            widthGrow: 1,
            widthMin: 60,
            widthShrink: 1,
        },
        cellDef: (x) => {
            const tokenType = assetAndTokenConfigGetItemByTokenTypeName(x.tableData.assetAndTokenConfig, x.rowData.tokenTypeName);
            if (!tokenType.isOk) {
                return err('error occured');
            }
            return ok(s1T3.cellText(
                `${x.rowData.amount >= 0 ? '+' : '-'}${x.rowData.amount} ${tokenType.ok.tokenTypeUnit}`,
                { color: x.rowData.amount >= 0 ? 'green' : 'red' },
            ));
        },
    },
    statusOutgoing: {
        column: {
            header: 'Status',
            width: 70,
            widthMax: 145,
            widthGrow: 1,
        },
        cellDef: (x) => {
            switch (x.rowData.status) {
                // @todo: Change to iconAndText cell with iconID = clock
                case 'proposed': return ok(s1T3.cellText('Pending'));
                case 'accepted': return ok(s1T3.cellText('Accepted'));
                // @todo: Change to iconAndText cell with iconID = cross
                case 'rejected': return ok(s1T3.cellText('Rejected', { color: 'red' }));
                case 'cancelled': return ok(s1T3.cellText('Cancelled'));
            }
        },
    },
    actionIncoming: {
        column: {
            header: 'Action',
            width: 160,
            widthMax: 215,
            widthGrow: 1,
            widthMin: 140,
            widthShrink: 1,
        },
        cellDef: (x) => {
            const order = x.rowData;
            switch (x.rowData.status) {
                case 'proposed': return ok(s1T3.cellButtons ([
                    {label: 'Accept', onAction: () => x.tableData.onAction({ order, action: 'accept' })},
                    {label: 'Reject', onAction: () => x.tableData.onAction({ order, action: 'reject' })},
                ]));
                case 'accepted': return ok(s1T3.cellText('Accepted'));
                // @todo: Change to iconAndText cell with iconID = cross
                case 'rejected': return ok(s1T3.cellText('Rejected', { color: 'red' }));
                case 'cancelled': return ok(s1T3.cellText('Sender cancelled'));
            }
        },
    },

    actionOutgoing: {
        column: {
            header: 'Action',
            width: 140,
            widthMax: 140,
            widthGrow: 1,
            widthMin: 70,
            widthShrink: 1,
        },
        cellDef: (x) =>ok(
            s1T3.cellButtons([
                {
                    label: 'View',
                    onAction: () => x.tableData.onAction({  order: x.rowData, action: 'view'}),
                },
            ]),
        ),
    },
};      

export type TableID =
    'incomingTokenTransfers' |
    'outgoingTokenTransfers';

export const tableDefs: Record<TableID, Q['table']> = {
    incomingTokenTransfers: {
        columns: [
            colDefs.fromUserID,
            colDefs.fromAccountIDIncoming,
            colDefs.transactionID,
            colDefs.lastModified,
            colDefs.tokenTypeLabel,
            colDefs.amountIncoming,
            colDefs.actionIncoming,
        ],
    },

    outgoingTokenTransfers: {
        columns: [
            colDefs.toUserID,
            colDefs.toAccountIDOutgoing,
            colDefs.transactionID,
            colDefs.lastModified,
            colDefs.tokenTypeLabel,
            colDefs.amountOutgoing,
            colDefs.statusOutgoing,
            colDefs.actionOutgoing,
        ],
    },
};
