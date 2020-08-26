import { tableDefs, Q, TableAction, TableID } from './defs';
import * as table3Defs from '../../../../systems/system1Table3/defs';
import * as vt from '../../../../systems/system1/models/values';
import * as s1 from '../../../../systems/system1/models';
import * as s1Table3 from '../../../../systems/system1/models/table3';

import * as mCfg from '@local/f-model/dist/config';
import {
    ReadonlyPurchaseOrders as PurchaseOrders,
} from '@local/f-model/dist/purchaseOrder';


interface PropsCommon {
    outerLayout?: s1Table3.OuterLayout;
    innerLayout?: s1Table3.InnerLayout;
    onAction: (x: { orderID: string, action: TableAction }) => void;
}

interface ContentData {
    type: 'data';
    assetAndTokenConfig: mCfg.AssetAndTokenConfig;
    orders: PurchaseOrders;
}
interface ContentMessage {
    type: 'message';
    header: string;
    body: string;
}

type Props = PropsCommon & (ContentData | ContentMessage);

const s1CompCreator = (compDefs: Q['table']) =>
    (props: Props): s1.LayoutElement  => {
        if (props.type === 'data') {
            return table3Defs.reduceTable3DefAndData({
                outerLayout: props.outerLayout,
                innerLayout: props.innerLayout,
                // onAction: props.onAction as null,
                rowsData: props.orders,
                def: compDefs,
                tableData: {
                    assetAndTokenConfig: props.assetAndTokenConfig,
                    onAction: props.onAction,
                },
            });
        } else {
            // @todo: To add message-state in the future
            return s1.table3Message({
                outerLayout: props.outerLayout || {},
                innerLayout: props.innerLayout || {},
                columns: compDefs.columns.map(x => x.column),
                content: {
                    type: 'message',
                    textHeader: props.header,
                    textBody: props.body,
                },
            });
        }
    };

const mapRecordValues = <K extends keyof any, T, U>(input: Record<K, T>, f: (value: T, key: K) => U): Record<K, U> => {
    const output: Partial<Record<K, U>> = {};
    for (const key in input) {
        output[key] = f(input[key], key);
    }
    return output as Record<K, U>;
};

const s1Tables = mapRecordValues(tableDefs, s1CompCreator);


export interface TablePaperOptions {
    width?: vt.DimensionSize;
    widthGrowth?: number;
    height?: vt.DimensionSize;
    heightGrowth?: number;
    margin?: vt.TopRightBottomLeft;
}

export interface TablePaperProps {
    options: TablePaperOptions;
    content: ContentData | ContentMessage;
    onAction: (x: { orderID: string, action: TableAction }) => void;
}

// @todo: To add parameters for "What does order status mean?"
interface TablePaperParams {
    title: string;
}
const qwe: Record<TableID, TablePaperParams> = {
    assetTokenizationOrders: {
        title: 'Asset Tokenization Orders',
    },
    assetCustodianAppointments: {
        title: 'Appointments',
    },
    tokenCreatorAppointments: {
        title: 'Appointments',
    },
    assetRegistrationOrders: {
        title: 'Asset Registration Orders',
    },
    tokenMintingOrders: {
        title: 'Token Minting Orders',
    },
};

// @todo: To add implementation for "What does order status mean?"
export const s1TablesWithPaper = mapRecordValues(s1Tables, (s1Table, tableID) =>
    (props: TablePaperProps): s1.PaperBlock => {
        const tablePaperParams = qwe[tableID];
        return s1.paperBlock(
            {
                margin: props.options.margin,
                width: props.options.width,
                height: props.options.height,
            },
            s1.linearLayoutV({ width: 'full', height: 'full', alignH: 'left', alignV: 'top' }, [
                s1.text(tablePaperParams.title, { margin: [20, 32, 24, 32], fontSize: 20, fontWeight: 500, color: 'black' }),
                s1Table({
                    ...props.content,
                    onAction: props.onAction,
                    outerLayout: {
                        width: 'full',
                        height: 0,
                        heightGrow: 1,
                    },
                    innerLayout: {
                        padding: [0, 32],
                        headerRowGutter: 26,
                        cellGutter: 10,
                    },
                }),
            ]),
        );
});
