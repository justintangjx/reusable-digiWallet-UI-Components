import { AssetTypeAndTokenTypeBalance } from '@local/f-model/dist/v3/groups/assetDeregistration/index';
import * as defs from './defs';

import * as table3Defs from '../../../../systems/system1Table3/defs';
import * as vt from '../../../../systems/system1/models/values';
import * as s1 from '../../../../systems/system1/models';

import * as mCfg from '@local/f-model/dist/config';

interface PropsCommon {
    outerLayout?: s1.Table3OuterLayout;
    innerLayout?: s1.Table3InnerLayout;
    onAction: (x: { assetAndTokenTypeBalance: AssetTypeAndTokenTypeBalance, action: defs.TableAction }) => void;
}

interface ContentData {
    type: 'data';
    assetAndTokenConfig: mCfg.AssetAndTokenConfig;
    assetAndTokenTypeBalances: readonly AssetTypeAndTokenTypeBalance[];
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
                rowsData: props.assetAndTokenTypeBalances,
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

const myTokensTable = s1CompCreator(defs.tableDefs.tokens);

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
    onAction: (x: { assetAndTokenTypeBalance: AssetTypeAndTokenTypeBalance, action: defs.TableAction }) => void;
}

export const walletTablePaper = (props: TablePaperProps): s1.PaperBlock => {
    let title = 'Redeemable Tokens';
    if (props.content.type === 'data') {
        title = `Redeemable Tokens (${props.content.assetAndTokenTypeBalances.length})`;
    }
    const viewS1Component = myTokensTable;
    return s1.paperBlock(
        {
            margin: props.options.margin,
            width: props.options.width,
            height: props.options.height,
        },
        s1.linearLayoutV({ width: 'full', height: 'full', alignH: 'left', alignV: 'top' }, [
            s1.text(title, { margin: [20, 20, 24, 20], fontSize: 20, fontWeight: 500, color: 'black' }),
            viewS1Component({
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
