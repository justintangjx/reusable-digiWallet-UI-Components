import { ok, err } from '@local/result';

import * as mCfg from '@local/f-model/dist/config';
import { AssetTypeAndTokenTypeBalance } from '@local/f-model/dist/v3/groups/assetDeregistration/index';

import * as t3 from '../../../../systems/system1/models/table3';
import * as table3Defs from '../../../../systems/system1Table3/defs';

// ---

const cellText = t3.cellText;
const cellIconAndText = t3.cellIconAndText;
const cellButtons = t3.cellButtons;
const cellButton = (button: t3.CellButtonsButton) => cellButtons([button]);

// ---

export type TableAction =
    'redeem';

export type TblData = {
    assetAndTokenConfig: mCfg.AssetAndTokenConfig;
    onAction: (x: { assetAndTokenTypeBalance: AssetTypeAndTokenTypeBalance, action: TableAction }) => void;
};
export type RowData = AssetTypeAndTokenTypeBalance;

export type Q = table3Defs.DefCreator<TblData, RowData>;

type ColID =
    'tokenType' |
    // ---
    'assetType' |
    'assetAmount' |
    'tokenAmount' |
    // ---
    'action';


const colDefs: Record<ColID, Q['column']> = {
    tokenType: {
        column: {
            header: 'Token',
            width: 200,
            widthMax: 220,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => {
            const tokenTypeName = x.rowData.tokenTypeName;
            const tokenTypeConfigResult = mCfg.assetAndTokenConfigC(x.tableData.assetAndTokenConfig).getByTokenTypeName(tokenTypeName);
            if (!tokenTypeConfigResult.isOk) return err(`Config for token type name [${tokenTypeName}] was not found.`);
            return ok(cellText(tokenTypeConfigResult.ok.tokenTypeLabel));
        },
    },
    assetType: {
        column: {
            header: 'Asset',
            width: 200,
            widthMax: 220,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => {
            const tokenTypeName = x.rowData.tokenTypeName;
            const tokenTypeConfigResult = mCfg.assetAndTokenConfigC(x.tableData.assetAndTokenConfig).getByTokenTypeName(tokenTypeName);
            if (!tokenTypeConfigResult.isOk) return err(`Config for token type name [${tokenTypeName}] was not found.`);
            return ok(cellText(tokenTypeConfigResult.ok.assetTypeLabel));
        },
    },
    assetAmount: {
        column: {
            header: 'Asset amount',
            width: 200,
            widthMax: 220,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => {
            const assetTypeName = x.rowData.assetTypeName;
            const tokenTypeConfigResult = mCfg.assetAndTokenConfigC(x.tableData.assetAndTokenConfig).getByAssetTypeName(assetTypeName);
            if (!tokenTypeConfigResult.isOk) return err(`Config for asset type name [${assetTypeName}] was not found.`);
            const amount = x.rowData.assetAmount;
            const unit = tokenTypeConfigResult.ok.assetTypeUnit;
            return ok(cellText(`${amount} ${unit}`));
        },
    },
    tokenAmount: {
        column: {
            header: 'Token amount',
            width: 200,
            widthMax: 220,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => {
            const tokenTypeName = x.rowData.tokenTypeName;
            const tokenTypeConfigResult = mCfg.assetAndTokenConfigC(x.tableData.assetAndTokenConfig).getByTokenTypeName(tokenTypeName);
            if (!tokenTypeConfigResult.isOk) return err(`Config for token type name [${tokenTypeName}] was not found.`);
            const amount = x.rowData.tokenAmount;
            const unit = tokenTypeConfigResult.ok.tokenTypeUnit;
            return ok(cellText(`${amount} ${unit}`));
        },
    },
    action: {
        column: {
            header: 'Action',
            width: 140,
            widthMax: 150,
            widthGrow: 1,
            widthMin: 50,
            widthShrink: 1,
        },
        cellDef: (x) => ok(cellButton({
            label: 'Redeem',
            onAction: () => x.tableData.onAction({ assetAndTokenTypeBalance: x.rowData, action: 'redeem' }),
        })),
    },
};

export type TableID =
    'tokens';

export const tableDefs: Record<TableID, Q['table']> = {
    tokens: {
        columns: [
            colDefs.tokenType,
            colDefs.assetType,
            colDefs.assetAmount,
            colDefs.tokenAmount,
            colDefs.action,
        ],
    },
};
