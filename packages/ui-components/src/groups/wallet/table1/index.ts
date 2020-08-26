import * as React from 'react';
import * as r from '@local/result';
import { AssetAndTokenConfig } from '@local/f-model/dist/groups/config/model';

import * as m from '../../../systems/system1/models';

import * as mWallet from '@local/f-model/dist/groups/wallet/index';

import { reduceTable1DefAndData } from '../../../systems/system1Table1/defs';

import { Element } from '../../../systems/system1/impl/element/index';

import {
    tableDefs,
    RowID,
    RowAction,
} from './defs';

export {
    TableID,
    tableDefs,
} from './defs';

const errorMessageTable1Creator = (
    title: string,
    message: string,
): m.LayoutElement =>
m.paperBlock({ width: 'full', height: 500 },
    m.linearLayoutV({ height: 'full', alignH: 'left', alignV: 'top', padding: [0, 0] }, [
        m.linearLayoutSpacer({ size: 20 }),
        m.text(title, { fontWeight: 500, fontSize: 20, margin: [0, 0, 0, 24] }),
        m.linearLayoutSpacer({ size: 12 }),
        m.linearLayoutV({ width: 'full', grow: 1 }, [
            m.text(message),
        ]),
    ]),
);


const tokenTransactionsTable1Creator = (
    assetAndTokenConfig: AssetAndTokenConfig,
    tokenTransactions: readonly mWallet.TokenTransaction[],
    onAction: (rowID: RowID, rowAction: RowAction) => void,
    options?: m.Table1<RowID, RowAction>['options'],
): m.LayoutElement =>
    m.paperBlock({ width: 'full', height: 500 },
        m.linearLayoutV({ alignH: 'left', padding: [0, 0] }, [
            m.linearLayoutSpacer({ size: 20 }),
            m.text('Token Transactions', { fontWeight: 500, fontSize: 20, margin: [0, 0, 0, 24] }),
            m.linearLayoutSpacer({ size: 12 }),
            reduceTable1DefAndData(
                tableDefs['tokenTransactions'],
                { assetAndTokenConfig },
                tokenTransactions,
                onAction,
                {},
            ),
            m.linearLayoutSpacer({ size: 22 }),
        ]),
    );

export type TokenTransactionsTableProps = r.Result<{
    assetAndTokenConfig: AssetAndTokenConfig;
    tokenTransactions: readonly mWallet.TokenTransaction[];
    onAction: (rowID: RowID, rowAction: RowAction) => void;
}, string>;

export const TokenTransactionsTable = (props: TokenTransactionsTableProps): React.ReactElement => {
    if (!props.isOk) {
        return React.createElement(Element,
            errorMessageTable1Creator('Token Transactions', props.err),
        );
    }
    return React.createElement(Element,
        tokenTransactionsTable1Creator(
            props.ok.assetAndTokenConfig,
            props.ok.tokenTransactions,
            props.ok.onAction,
        ),
    );
};
