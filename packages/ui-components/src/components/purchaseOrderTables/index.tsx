import { default as React, ReactElement } from 'react';

// ---


import {
    CellProps as TableCellProps,
    RowProps as TableRowProps,
    BodyProps as TableBodyProps,
    TableProps as TableTableProps,
    PurchaseOrderTable,
} from './PurchaseOrderTable/index';

import {
    TableParams,
    assetTokenizationOrdersTableParams,
    assetCustodianAppointmentTableParams,
    tokenCreatorAppointmentTableParams,
    assetRegistrationOrdersTableParams,
    tokenMintingOrdersTableParams,
} from './params';


import {
    AssetAndTokenConfig,
} from '@local/f-model/dist/config';

import {
    ReadonlyPurchaseOrders as PurchaseOrders,
} from '@local/f-model/dist/purchaseOrder';



// ---



export interface TableLoadingProps {
    type: 'loading';
}

export interface TableDataProps<A> {
    type: 'data';
    assetAndTokenConfig: AssetAndTokenConfig;
    purchaseOrders: PurchaseOrders;
    onAction: (orderID: string, actionID: A) => void;
}

export interface TableErrorProps {
    type: 'error';
    message: string;
}

export type TableProps<A> =
    (TableLoadingProps | TableDataProps<A> | TableErrorProps) &
    { onOrderStatusInfoPopup?: () => void; };

export type TableComponent<A> = (props: TableProps<A>) => ReactElement;

// ---

// export type TableConfig<ButtonID> = Pick<tableModels.TableProps<ButtonID>, 'topBar' | 'columnHeaders'>;

const creator =
    <A extends string>(tableParams: TableParams<A>): TableComponent<A> =>
        (props) => {
            return (<PurchaseOrderTable<A>
                topBar={{
                    tableTitle: tableParams.title,
                    toolTipMsg: tableParams.tableTooltip,
                    onOrderStatusInfoPopup:
                        tableParams.onOrderStatusInfoPopup ?
                            (props.onOrderStatusInfoPopup || (() => {})) :
                            undefined,
                }}
                columnHeaders={tableParams.columns.map(params => params.header)}
                body={((): TableBodyProps<A> => {
                    switch (props.type) {
                        case 'loading': return { type: 'loading' };
                        case 'data': {
                            const assetAndTokenConfig = props.assetAndTokenConfig;
                            return {
                                type: 'data',
                                rows: props.purchaseOrders.map((purchaseOrder): TableRowProps<A> => ({
                                    rowID: purchaseOrder.orderID,
                                    cells: tableParams.columns.map(
                                        (columnParams, index): TableCellProps<A> =>
                                            columnParams.cell(
                                                {
                                                    assetAndTokenConfig,
                                                    role: tableParams.role,
                                                    purchaseOrder,
                                                    onAction: props.onAction,
                                                },
                                                index === 0,
                                            )
                                    ),
                                })),
                            };
                        }
                        case 'error': return { type: 'error', message: props.message };
                    }
                })()}
            />);
        };

export const AssetTokenizationOrdersTable = creator(assetTokenizationOrdersTableParams);
export const AssetCustodianAppointmentsTable = creator(assetCustodianAppointmentTableParams);
export const TokenCreatorAppointmentsTable = creator(tokenCreatorAppointmentTableParams);
export const AssetRegistrationOrdersTable = creator(assetRegistrationOrdersTableParams);
export const TokenMintingOrdersTable = creator(tokenMintingOrdersTableParams);
