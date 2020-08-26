import * as result from '@local/result';
import * as mMktpl from '@local/f-model/dist/groups/mktpl/index';

import * as mCfg from '@local/f-model/dist/config';
import { assetAndTokenConfigGetItemByTokenTypeName as astTokCfgGetByTokTName } from '@local/f-model/dist/config';

import moment from 'moment';

import * as models from '../../../../systems/system1/models';
import * as table3Defs from '../../../../systems/system1Table3/defs';

// ---

export type TblData = {
    astTokCfg: mCfg.AssetAndTokenConfig;
    onAction: (x: { order: mMktpl.RdOrd, action: 'cancel' }) => void;
};
export type RowData = mMktpl.RdOrd;

export type Q = table3Defs.DefCreator<TblData, RowData>;

const formatNumberAsDate = (dateAsNumber: number): string => {
    return moment(dateAsNumber).format('MMM D, YYYY, h:mm:ss A');
};

type ColID =
    'orderID' |
    'submitTime' |
    'direction' |
    'tokenPair' |
    'price' |
    'quantity' |
    'orderState' |
    'action';

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
        cellDef: (x) => result.ok(models.table3CellText(x.rowData.ordID)),
    },
    submitTime: {
        column: {
            header: 'Date',
            width: 200,
            widthMax: 220,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
          
        },
        cellDef: (x) => result.ok({
            type: 'text',
            text: (x.rowData.submitTime === null) ? 'not available' : formatNumberAsDate(x.rowData.submitTime),
        }),
    },
    direction: {
        column: {
            header: 'Type',
            width: 100,
            widthMax: 100,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => {
            switch (x.rowData.dir) {
                case 'buy': return result.ok(models.table3CellText('BUY', { color: 'green' }));
                case 'sell': return result.ok(models.table3CellText('SELL', { color: 'red' }));
            }
        },
    },
    tokenPair: {
        column: {
            header: 'Pair',
            width: 100,
            widthMax: 100,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => {
            const baseTokCfg = astTokCfgGetByTokTName(x.tableData.astTokCfg, x.rowData.tokTPair.base);
            const baseLabel = baseTokCfg.isOk ? baseTokCfg.ok.tokenTypeUnit : x.rowData.tokTPair.base;
            const cntrTokCfg = astTokCfgGetByTokTName(x.tableData.astTokCfg, x.rowData.tokTPair.cntr);
            const cntrLabel = cntrTokCfg.isOk ? cntrTokCfg.ok.tokenTypeUnit : x.rowData.tokTPair.cntr;
            return result.ok(models.table3CellText(`${baseLabel}/${cntrLabel}`));
        },
    },
    price: {
        column: {
            header: 'Price',
            width: 100,
            widthMax: 150,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => result.ok(models.table3CellText(x.rowData.prc.toString())),
    },
    quantity: {
        column: {
            header: 'Amount',
            width: 100,
            widthMax: 150,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => result.ok(models.table3CellText(x.rowData.qty.toString())),
    },
    orderState: {
        column: {
            header: 'Status',
            width: 100,
            widthMax: 150,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => result.ok(models.table3CellText(`${x.rowData.fill.toString()}/${x.rowData.qty} Filled`)),
    },
    action: {
        column: {
            header: 'Action',
            width: 140,
            widthMax: 150,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => {
            switch (x.rowData.state) {
                case 'new':
                case 'open': return result.ok(models.table3CellButtons([
                    {
                        label: 'Cancel order',
                        onAction: () => x.tableData.onAction({ order: x.rowData, action: 'cancel' }),
                    }
                ]));
                case 'cancelling': return result.ok(models.table3CellText('Cancelling'));
                case 'closed': return result.ok(models.table3CellText(''));
                case 'cancelled': return result.ok(models.table3CellText('Cancelled'));
            }
        }
    },
};

export type TableID =
    'openOrd' |
    'ordHist';

export const tableDefs: Record<TableID, Q['table']> = {
    openOrd: {
        columns: [
            colDefs.orderID,
            colDefs.submitTime,
            colDefs.direction,
            colDefs.tokenPair,
            colDefs.quantity,
            colDefs.price,
            colDefs.orderState,
            colDefs.action,
        ],
    },
    ordHist: {
        columns: [
            colDefs.orderID,
            colDefs.submitTime,
            colDefs.direction,
            colDefs.tokenPair,
            colDefs.quantity,
            colDefs.price,
            colDefs.orderState,
            colDefs.action,
        ],
    },
};
