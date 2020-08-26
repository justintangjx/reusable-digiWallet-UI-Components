export {
    CellDef,
    ColumnDef,
    RowDataAndProps,
    TableDef,
} from './models';

import {
    CellDef,
    ColumnDef,
    RowDataAndProps,
    TableDef,
} from './models';

import {
    RowProps,
    Table1Props,
} from '../../components/table1/index';

export const mapTable1DefToProps = <TableData, RowData, RowID, RowAction>(
    def: TableDef<TableData, RowData, RowID, RowAction>,
    tableData: TableData,
    rowsData: readonly RowData[],
): Pick<Table1Props<RowID, RowAction>, 'columnHeaders' | 'rows'> => {
    return {
        columnHeaders: def.columns.map(columnDef => columnDef.header),
        rows: rowsData.map((rowData): RowProps<RowID, RowAction> => ({
            cells: def.columns.map(columnDef => columnDef.cell({
                rowData,
                tableData,
            })),
        })),
    };
};

