import * as React from 'react';
import * as r from '@local/result';
import {
    AssetAndTokenConfig,
} from '@local/f-model/dist/groups/config/model';

import {
    ReadonlyTransferOrders,
} from '@local/f-model/dist/groups/tokenTransfer/model';

import * as m from '../../../systems/system1/models';

import {
    reduceTable1DefAndData,
} from '../../../systems/system1Table1/defs';
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

import { State as IOReadonlyDataState } from '@local/f-workflows/dist/ioReadonlyData/index';
import * as w from '@local/f-workflows/dist/ioReadonlyData/index';
import { TDict as TokenTransferIOReadonlyDataTDict } from '@local/f-model/dist/groups/tokenTransfer/workflows/ioReadonlyData';
import { GITs as IOReadonlyDataGITs } from '@local/f-model/dist/workflows/ioReadonlyData/index';

// type IncomingOrdersData = IOReadonlyDataGITs['tokenTransfer']['incomingOrders']['data'];
// type IncomingOrdersState = IOReadonlyDataState<IOReadonlyDataGITs['tokenTransfer']['incomingOrders']>;
// type OutgoingOrdersState = IOReadonlyDataState<IOReadonlyDataGITs['tokenTransfer']['outgoingOrders']>;
// type AssetAndTokenConfigState = IOReadonlyDataState<IOReadonlyDataGITs['config']['assetAndTokenConfig']>;

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


export const incomingTokenTransfersTable1Creator = (
    assetAndTokenConfig: AssetAndTokenConfig,
    tokenTransferOrders: ReadonlyTransferOrders,
    onAction: (rowID: RowID, rowAction: RowAction) => void,
    options?: m.Table1<RowID, RowAction>['options'],
): m.LayoutElement =>
    m.paperBlock({ width: 'full', height: 500 },
        m.linearLayoutV({ alignH: 'left', padding: [0, 0] }, [
            m.linearLayoutSpacer({ size: 20 }),
            m.text('Incoming Token Transfers', { fontWeight: 500, fontSize: 20, margin: [0, 0, 0, 24] }),
            m.linearLayoutSpacer({ size: 12 }),
            reduceTable1DefAndData(
                tableDefs['incomingTokenTransfers'],
                { assetAndTokenConfig },
                tokenTransferOrders,
                onAction,
                {},
            ),
            m.linearLayoutSpacer({ size: 22 }),
        ]),
    );

export const outgoingTokenTransfersTable1Creator = (
    assetAndTokenConfig: AssetAndTokenConfig,
    tokenTransferOrders: ReadonlyTransferOrders,
    onAction: (rowID: RowID, rowAction: RowAction) => void,
    options?: m.Table1<RowID, RowAction>['options'],
): m.LayoutElement =>
    m.paperBlock({ width: 'full', height: 500 },
        m.linearLayoutV({ alignH: 'left', padding: [0, 0] }, [
            m.linearLayoutSpacer({ size: 20 }),
            m.text('Outgoing Token Transfers', { fontWeight: 500, fontSize: 20, margin: [0, 0, 0, 24] }),
            m.linearLayoutSpacer({ size: 12 }),
            reduceTable1DefAndData(
                tableDefs['outgoingTokenTransfers'],
                { assetAndTokenConfig },
                tokenTransferOrders,
                onAction,
                options,
            ),
            m.linearLayoutSpacer({ size: 22 }),
        ]),
    );

type TokenTransfersTableIncomingProps = r.Result<{
    assetAndTokenConfig: AssetAndTokenConfig;
    tokenTransferOrders: ReadonlyTransferOrders;
    onAction: (rowID: RowID, rowAction: RowAction) => void;
}, string>;

export const TokenTransfersTableIncoming = (props: TokenTransfersTableIncomingProps): React.ReactElement => {
    if (!props.isOk) {
        return React.createElement(Element,
            errorMessageTable1Creator('Incoming Token Transfers', props.err),
        );
    }
    return React.createElement(Element,
        incomingTokenTransfersTable1Creator(
            props.ok.assetAndTokenConfig,
            props.ok.tokenTransferOrders,
            props.ok.onAction,
        ),
    );
};

type TokenTransfersTableOutgoingProps = r.Result<{
    assetAndTokenConfig: AssetAndTokenConfig;
    tokenTransferOrders: ReadonlyTransferOrders;
    onAction: (rowID: RowID, rowAction: RowAction) => void;
    options?: m.Table1<RowID, RowAction>['options'],
}, string>

export const TokenTransfersTableOutgoing = (props: TokenTransfersTableOutgoingProps): React.ReactElement => {
    if (!props.isOk) {
        return React.createElement(Element,
            errorMessageTable1Creator('Outgoing Token Transfers', props.err),
        );
    }
    return React.createElement(Element,
        outgoingTokenTransfersTable1Creator(
            props.ok.assetAndTokenConfig,
            props.ok.tokenTransferOrders,
            props.ok.onAction,
            props.ok.options,
        ),
    );
};
