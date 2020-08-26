import * as defs from './defs';
import * as table3Defs from '../../../../systems/system1Table3/defs';
import * as vt from '../../../../systems/system1/models/values';
import * as s1 from '../../../../systems/system1/models';

import * as mCfg from '@local/f-model/dist/config';
import * as mMktpl from '@local/f-model/dist/groups/mktpl/index';

interface PropsCommon {
    outerLayout?: s1.Table3OuterLayout;
    innerLayout?: s1.Table3InnerLayout;
    onAction: (x: { order: mMktpl.RdOrd, action: 'cancel' }) => void;
}

interface ContentData {
    type: 'data';
    astTokCfg: mCfg.AssetAndTokenConfig;
    orders: mMktpl.RdOrds;
}
interface ContentMessage {
    type: 'message';
    header: string;
    body: string;
}

type Props = PropsCommon & (ContentData | ContentMessage);

const s1CompCreator = (compDefs: defs.Q['table']) =>
    (props: Props): s1.LayoutElement  => {
        if (props.type === 'data') {
            return table3Defs.reduceTable3DefAndData({
                outerLayout: props.outerLayout,
                innerLayout: props.innerLayout,
                // onAction: props.onAction as null,
                rowsData: props.orders,
                def: compDefs,
                tableData: {
                    astTokCfg: props.astTokCfg,
                    onAction: props.onAction,
                },
            });
        } else {
            // @todo: To add message-state in the future
            return s1.table3Message({
                outerLayout: props.outerLayout || {},
                innerLayout: props.innerLayout || {},
                columns: defs.tableDefs.openOrd.columns.map(x => x.column),
                content: {
                    type: 'message',
                    textHeader: props.header,
                    textBody: props.body,
                },
            });
        }
    };

export const s1OpenOrdTbl = s1CompCreator(defs.tableDefs.openOrd);
export const s1OrdHistTbl = s1CompCreator(defs.tableDefs.ordHist);

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
    onAction: (x: { order: mMktpl.RdOrd, action: 'cancel' }) => void;
}

export const openOrdersTablePaperS1Component = (props: TablePaperProps): s1.PaperBlock => {
    return s1.paperBlock(
        {
            margin: props.options.margin,
            width: props.options.width,
            height: props.options.height,
        },
        s1.linearLayoutV({ width: 'full', height: 'full', alignH: 'left', alignV: 'top' }, [
            s1.text('Open Orders', { margin: [20, 20, 24, 20], fontSize: 20, fontWeight: 500, color: 'black' }),
            s1OpenOrdTbl({
                ...props.content,
                onAction: props.onAction,
                outerLayout: {
                    width: 'full',
                    height: 0,
                    heightGrow: 1,
                },
                innerLayout: {
                    padding: [0, 20],
                    cellGutter: 10,
                },
            }),
        ]),
    );
};

export const orderHistoryTablePaperS1Component = (props: TablePaperProps): s1.PaperBlock => {
    return s1.paperBlock(
        {
            margin: props.options.margin,
            width: props.options.width,
            height: props.options.height,
        },
        s1.linearLayoutV({ width: 'full', height: 'full', alignH: 'left', alignV: 'top' }, [
            s1.text('Order History', { margin: [20, 20, 24, 20], fontSize: 20, fontWeight: 500, color: 'black' }),
            s1OpenOrdTbl({
                ...props.content,
                onAction: props.onAction,
                outerLayout: {
                    width: 'full',
                    height: 0,
                    heightGrow: 1,
                },
                innerLayout: {
                    padding: [0, 20],
                    cellGutter: 10,
                },
            }),
        ]),
    );
};
