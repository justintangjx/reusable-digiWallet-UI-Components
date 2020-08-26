import {
    Table1Cell,
    Table1Row,
    Table1,
    Table1Data,
    table1Data,
} from '../system1/models';

// ---

export interface RowDataAndProps<TableData, RowData> {
    readonly tableData: TableData;
    readonly rowData: RowData;
    // readonly onAction: (rowID: RowID, rowAction: RowAction) => void;
}

export type CellDef<TableData, RowData, RowID, RowAction> =
    (rowDataAndProps: RowDataAndProps<TableData, RowData>) =>
        Table1Cell<RowID, RowAction>;

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

const mapTable1DefToColumnHeadersAndRow = <TableData, RowData, RowID, RowAction>(
    def: TableDef<TableData, RowData, RowID, RowAction>,
    tableData: TableData,
    rowsData: readonly RowData[],
): { columnHeaders: Table1Data<RowID, RowAction>['columnHeaders'], rows: Table1Data<RowID, RowAction>['data']['rows'] } => {
    return {
        columnHeaders: def.columns.map(columnDef => columnDef.header),
        rows: rowsData.map((rowData): Table1Row<RowID, RowAction> => ({
            cells: def.columns.map(columnDef => columnDef.cell({
                rowData,
                tableData,
            })),
        })),
    };
};

export const reduceTable1DefAndData = <TableData, RowData, RowID, RowAction>(
    def: TableDef<TableData, RowData, RowID, RowAction>,
    tableData: TableData,
    rowsData: readonly RowData[],
    onAction: (rowID: RowID, rowAction: RowAction) => void,
    options?: Table1<RowID, RowAction>['options'],
): Table1<RowID, RowAction> => {
    const columnHeadersAndRow = mapTable1DefToColumnHeadersAndRow(def, tableData, rowsData);
    return table1Data(
        columnHeadersAndRow.columnHeaders,
        columnHeadersAndRow.rows,
        onAction,
        options,
    );
};
