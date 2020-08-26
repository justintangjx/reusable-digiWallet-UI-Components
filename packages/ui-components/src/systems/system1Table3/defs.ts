import * as result from '@local/result';
import * as models from '../system1/models';

// ---

export interface RowDataAndProps<TableData, RowData> {
    readonly tableData: TableData;
    readonly rowData: RowData;
    // readonly onAction: (rowID: RowID, rowAction: RowAction) => void;
}

export type CellDef<TableData, RowData> =
    (rowDataAndProps: RowDataAndProps<TableData, RowData>) => result.Result<models.Table3Cell, string>;

export interface ColumnDef<TableData, RowData> {
    readonly column: models.Table3Column;
    readonly cellDef: CellDef<TableData, RowData>;
}

export interface TableDef<TableData, RowData> {
    readonly columns: readonly ColumnDef<TableData, RowData>[];
}

export type DefCreator<TableData, RowData> = {
    table: TableDef<TableData, RowData>;
    column: ColumnDef<TableData, RowData>;
    cell: CellDef<TableData, RowData>;
};

export const reduceTable3DefAndData = <TableData, RowData>(x: {
    def: TableDef<TableData, RowData>;
    tableData: TableData;
    rowsData: readonly RowData[];
    outerLayout?: models.Table3['outerLayout'];
    innerLayout?: models.Table3['innerLayout'];
}): models.Table3 => {
    const columns = x.def.columns.map(columnDef => columnDef.column);
    const rows: models.Table3Row[] = [];
    for (const rowData of x.rowsData) {
        const cells: models.Table3Cell[] = [];
        for (const columnDef of x.def.columns) {
            const cellResult = columnDef.cellDef({ tableData: x.tableData, rowData: rowData });
            if (!cellResult.isOk) {
                return models.table3Message({
                    columns,
                    content: {
                        type: 'message',
                        textHeader: 'An error has occured',
                        textBody: cellResult.err,
                    },
                    innerLayout: x.innerLayout || {},
                    outerLayout: x.outerLayout || {},
                });
            }
            cells.push(cellResult.ok);
        }
        rows.push({ cells });
    }
    return models.table3Data({
        columns,
        content: {
            type: 'data',
            rows,
        },
        innerLayout: x.innerLayout || {},
        outerLayout: x.outerLayout || {},
    });
};
