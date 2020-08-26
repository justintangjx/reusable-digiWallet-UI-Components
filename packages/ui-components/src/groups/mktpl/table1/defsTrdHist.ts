import * as mMktpl from '@local/f-model/dist/groups/mktpl/index';
import * as s1t1 from '../../../systems/system1Table1/defs';

// ---

type TblData = null;
type RowData = mMktpl.RdTrd;
type RowID = string;
type RowAction = null;

type Q = s1t1.DefCreator<TblData, RowData, RowID, RowAction>;

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
    'trdHist';

export const tblDefs: Record<TblID, Q['tbl']> = {
    trdHist: {
        columns: [
            colDefs.prc,
            colDefs.qty,
        ],
    },
};
