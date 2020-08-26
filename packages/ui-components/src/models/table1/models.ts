import {
    CellProps as TableCellProps,
} from '../../components/table1/index';

// ---

export interface RowDataAndProps<TableData, RowData> {
    readonly tableData: TableData;
    readonly rowData: RowData;
    // readonly onAction: (rowID: RowID, rowAction: RowAction) => void;
}

export type CellDef<TableData, RowData, RowID, RowAction> =
    (rowDataAndProps: RowDataAndProps<TableData, RowData>) =>
        TableCellProps<RowID, RowAction>;

export interface ColumnDef<TableData, RowData, RowID, RowAction> {
    readonly header: string;
    readonly cell: CellDef<TableData, RowData, RowID, RowAction>;
}

export interface TableDef<TableData, RowData, RowID, RowAction> {
    readonly columns: readonly ColumnDef<TableData, RowData, RowID, RowAction>[];
}
