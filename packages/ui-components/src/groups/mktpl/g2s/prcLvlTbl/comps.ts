import * as defs from './defs';
import * as s1T2Defs from '../../../../systems/system1Table2/defs';
import * as vt from '../../../../systems/system1/models/values';
import * as s1 from '../../../../systems/system1/models';

export interface RowData {
    readonly price: number;
    readonly quantity: number;
}


interface PropsCommon {
    options: {
        width?: vt.DimensionSize;
        widthGrow?: number;
        height?: vt.DimensionSize;
        heightGrow?: number;
        margin?: vt.TopRightBottomLeft;
    };
}
interface PropsData {
    type: 'data';
    rows: readonly RowData[];
}
interface PropsMsg {
    type: 'message';
    header: string;
    body: string;
}

type Props = PropsCommon & (PropsData | PropsMsg);

const paperBlockPadding: s1.TopRightBottomLeft = [20, 0];
const cellPadding: s1.TopRightBottomLeft =  [0, 20, 8, 0];


const priceLevelXTableS1C =
    (props: Props): s1.LayoutElement  => {
        if (props.type === 'data') {
            return s1T2Defs.reduceTable2DefAndData({
                def: defs.tableDefs.prcLvlXs,
                tableData: null,
                rowsData: props.rows.map(x => ({ prc: x.price, qty: x.quantity })),
                onAction: () => {},
                options: {
                    cellPadding: cellPadding,
                    width: props.options.width,
                    height: 0,
                    heightGrow: props.options.heightGrow,
                    margin: props.options.margin,
                },
            });
        } else {
            return s1.table2Message({
                columnHeaders: defs.tableDefs.prcLvlXs.columns.map(x => x.header),
                textHeader: props.header,
                textBody: props.body,
                options: props.options,
            });
        }
    };

interface OrderBookPriceLevelXTablesS1ComponentProps {
    sellOrders: PropsData | PropsMsg;
    buyOrders: PropsData | PropsMsg;
    options: PropsCommon['options'];
}

export type OrderBookPriceLevelXPaperS1ComponentOptions = PropsCommon['options'];

export const orderBookPriceLevelXPaperS1Component = (props: OrderBookPriceLevelXTablesS1ComponentProps): s1.PaperBlock => {
    return s1.paperBlock(
        {
            width: props.options.width,
            height: props.options.height,
            margin: props.options.margin,
            padding: paperBlockPadding,
        },
        s1.linearLayoutV({ width: 'full', height: 'full', grow: 1 }, [
            s1.linearLayoutV({ width: 'full', height: 0, grow: 1, alignH: 'left', alignV: 'top', padding: [0, 16, 10, 16] }, [
                s1.text('Sell Order', {fontSize: 20, fontWeight: 500, color: 'black'}),
                s1.linearLayoutSpacer({ size: 10 }),
                priceLevelXTableS1C({ ...props.sellOrders, options: { width: 'full', heightGrow: 1 } }),
            ]),
            s1.rectangle('full', 1, 'silver'),
            s1.linearLayoutV({ width: 'full', height: 0, grow: 1, alignH: 'left', alignV: 'top', padding: [0, 16] }, [
                s1.linearLayoutSpacer({ size: 10 }),
                s1.text('Buy Order', {fontSize: 20, fontWeight: 500, color: 'black'}),
                s1.linearLayoutSpacer({ size: 10 }),
                priceLevelXTableS1C({ ...props.buyOrders, options: { width: 'full', heightGrow: 1 } }),
            ]),
        ]),
    );
};

export type TradeHistoryPriceLevelXPaperS1COptions = PropsCommon['options'];

export interface TradeHistoryPriceLevelXTableS1CPropsData {
    readonly type: 'data';
    readonly rows: readonly RowData[];
    options: TradeHistoryPriceLevelXPaperS1COptions;
}

export interface TradeHistoryPriceLevelXPaperS1CPropsMessage {
    type: 'message';
    header: string;
    body: string;
    options: TradeHistoryPriceLevelXPaperS1COptions;
}

export type TradeHistoryPriceLevelXPaperS1CProps =
    TradeHistoryPriceLevelXTableS1CPropsData |
    TradeHistoryPriceLevelXPaperS1CPropsMessage;


export const tradeHistoryPriceLevelXPaperS1C = (props: TradeHistoryPriceLevelXPaperS1CProps): s1.PaperBlock => {
    if (props.type !== 'data') {
        return s1.paperBlock(
            {
                width: props.options.width,
                height: props.options.height,
                margin: props.options.margin,
                padding: paperBlockPadding,
            },
            s1.linearLayoutV({ width: 'full', height: 'full', grow: 1, padding: [0, 16], alignH: 'left' }, [
                s1.text('Trade History',{fontSize: 20, fontWeight: 500, color: 'black'}),
                s1.linearLayoutSpacer({ size: 10 }),
                s1.table2Message({
                    columnHeaders: defs.tableDefs.prcLvlXs.columns.map(x => x.header),
                    textHeader: props.header,
                    textBody: props.body,
                    options: {
                        width: 'full',
                        heightGrow: 1,
                    },
                })
            ]),
        );
    }
    return s1.paperBlock(
        {
            width: props.options.width,
            height: props.options.height,
            margin: props.options.margin,
            padding: paperBlockPadding,
        },
        s1.linearLayoutV({ width: 'full', height: 'full', grow: 1, padding: [0, 16], alignH: 'left' }, [
            s1.text('Trade History',{fontSize: 20, fontWeight: 500, color: 'black'}),
            s1.linearLayoutSpacer({ size: 10 }),
            priceLevelXTableS1C({
                type: 'data',
                rows: props.rows,
                options: { width: 'full', heightGrow: 1 },
            }),
        ]),
    );
};
