import { Order } from '@local/f-model/dist/v3/groups/assetDeregistration/index';
import * as defs from './defs';

import * as table3Defs from '../../../../systems/system1Table3/defs';
import * as vt from '../../../../systems/system1/models/values';
import * as s1 from '../../../../systems/system1/models';

import * as mCfg from '@local/f-model/dist/config';

interface PropsCommon {
    outerLayout?: s1.Table3OuterLayout;
    innerLayout?: s1.Table3InnerLayout;
    onAction: (x: { order: Order, action: defs.TableAction }) => void;
}

interface ContentData {
    type: 'data';
    assetAndTokenConfig: mCfg.AssetAndTokenConfig;
    orders: readonly Order[];
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
                rowsData: props.orders,
                def: compDefs,
                tableData: {
                    assetAndTokenConfig: props.assetAndTokenConfig,
                    onAction: props.onAction,
                },
            });
        } else {
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
    onAction: (x: { order: Order, action: defs.TableAction }) => void;
}

const tablePaperCreator = (x: {
    title: string;
    tableS1Component: (props: Props) => s1.LayoutElement;
}) =>
    (props: TablePaperProps): s1.PaperBlock => {
        return s1.paperBlock(
            {
                margin: props.options.margin,
                width: props.options.width,
                height: props.options.height,
            },
            s1.linearLayoutV({ width: 'full', height: 'full', alignH: 'left', alignV: 'top' }, [
                s1.text(x.title, { margin: [20, 20, 24, 20], fontSize: 20, fontWeight: 500, color: 'black' }),
                x.tableS1Component({
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

export const tokenRedemptionOrdersTablePaper = tablePaperCreator({
    title: 'Token Redemption Orders',
    tableS1Component: s1CompCreator(defs.tableDefs.tokenRedemptionOrders),
});

export const tokenBurnerAppointmentsTablePaper = tablePaperCreator({
    title: 'Appointments',
    tableS1Component: s1CompCreator(defs.tableDefs.tokenBurnerAppointments),
});

export const assetDeregistrarAppointmentsTablePaper = tablePaperCreator({
    title: 'Appointments',
    tableS1Component: s1CompCreator(defs.tableDefs.assetDeregistrarAppointments),
});

export const burnTokenTablePaper = tablePaperCreator({
    title: 'Token Burning Orders',
    tableS1Component: s1CompCreator(defs.tableDefs.burnToken),
});

export const deregisterAssetsTablePaper = tablePaperCreator({
    title: 'Asset Deregistration Orders',
    tableS1Component: s1CompCreator(defs.tableDefs.deregisterAssets),
});

