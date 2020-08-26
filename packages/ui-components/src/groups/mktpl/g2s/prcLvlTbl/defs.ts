import * as mMktpl from '@local/f-model/dist/groups/mktpl/index';
import * as s1t2 from '../../../../systems/system1Table2/defs';

// ---
type TblData = null;
type RowData = mMktpl.RdPrcLvlX;
type RowID = string;
type RowAction = null;

export type Q = s1t2.DefCreator<TblData, RowData, RowID, RowAction>;

type ColID =
    'prc' |
    'qty';

const colDefs: Record<ColID, Q['col']> = {
    prc: {
        header: 'Price',
        cell: (x) => ({
            type: 'text',
            text: x.rowData.prc.toString(),
        }),
    },
    qty: {
        header: 'Amount',
        cell: (x) => ({
            type: 'text',
            text: x.rowData.qty.toString(),
        }),
    },
};

export type TblID =
    'prcLvlXs';

export const tableDefs: Record<TblID, Q['tbl']> = {
    prcLvlXs: {
        columns: [
            colDefs.prc,
            colDefs.qty,
        ],
    },
};
