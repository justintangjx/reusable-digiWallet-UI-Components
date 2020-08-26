import * as m from '../system1/models';

// ---

export interface RowDataAndProps<TableData, RowData> {
    readonly tableData: TableData;
    readonly rowData: RowData;
    // readonly onAction: (rowID: RowID, rowAction: RowAction) => void;
}

export type CellDef<TableData, RowData, RowID, RowAction> =
    (rowDataAndProps: RowDataAndProps<TableData, RowData>) =>
        m.Table2Cell<RowID, RowAction>;

export interface ColumnDef<TableData, RowData, RowID, RowAction> {
    readonly header: string;
    readonly cell: CellDef<TableData, RowData, RowID, RowAction>;
}


export type DefCreator<TableData, RowData, RowID, RowAction> = {
    tbl: TableDef<TableData, RowData, RowID, RowAction>;
    col: ColumnDef<TableData, RowData, RowID, RowAction>;
    cel: CellDef<TableData, RowData, RowID, RowAction>;
};

export interface TableDef<TableData, RowData, RowID, RowAction> {
    readonly columns: readonly ColumnDef<TableData, RowData, RowID, RowAction>[];
}

const mapTable2DefToColumnHeadersAndRow = <TableData, RowData, RowID, RowAction>(
    def: TableDef<TableData, RowData, RowID, RowAction>,
    tableData: TableData,
    rowsData: readonly RowData[],
): { columnHeaders: readonly string[], rows: m.Table2Data<RowID, RowAction>['rows'] } => {
    return {
        columnHeaders: def.columns.map(columnDef => columnDef.header),
        rows: rowsData.map((rowData): m.Table2Row<RowID, RowAction> => ({
            cells: def.columns.map(columnDef => columnDef.cell({
                rowData,
                tableData,
            })),
        })),
    };
};

export const reduceTable2DefAndData = <TableData, RowData, RowID, RowAction>(x: {
    def: TableDef<TableData, RowData, RowID, RowAction>;
    tableData: TableData;
    rowsData: readonly RowData[];
    onAction: (rowID: RowID, rowAction: RowAction) => void;
    options?: m.Table2Common['options'];
}): m.Table2<RowID, RowAction> => {
    const columnHeadersAndRows = mapTable2DefToColumnHeadersAndRow(x.def, x.tableData, x.rowsData);
    return m.table2Data({
        columnHeaders: columnHeadersAndRows.columnHeaders,
        rows: columnHeadersAndRows.rows,
        onAction: x.onAction,
        options: x.options,
    });
};
