import React from 'react';

import * as s1 from '../../../systems/system1/models';
import * as s1ImplElement from '../../../systems/system1/impl/element/index';
import * as mWallet from '@local/f-model/dist/groups/wallet/index';
import * as mConfig from '@local/f-model/dist/groups/config/model';
import * as r from '@local/result';

import { DashboardContentFrame } from '../contentFrame/index';

interface TokenTypeBalancesS1Props {
    assetAndTokenConfig: r.Result<mConfig.AssetAndTokenConfig, string>;
    tokenTypeBalances: mWallet.ReadonlyTokenTypeBalances;
}

const tokenTypeBalancesS1 = (props: TokenTypeBalancesS1Props): s1.LayoutElement => {
    const tokenTypeBalanceEls: s1.LayoutElement[] = [];
    for (const tokenTypeBalance of props.tokenTypeBalances){

        let tokenTypeLabel = tokenTypeBalance.tokenTypeName;
        let tokenTypeUnit = tokenTypeBalance.tokenTypeName;
        let assetTypeUnit = tokenTypeBalance.tokenTypeName;
        let assetBalance = tokenTypeBalance.balance;

        if (props.assetAndTokenConfig.isOk) {
            const tokenConfigI = mConfig.assetAndTokenConfigGetItemByTokenTypeName(props.assetAndTokenConfig.ok, tokenTypeBalance.tokenTypeName);
            if (tokenConfigI.isOk) {
                tokenTypeLabel = tokenConfigI.ok.tokenTypeLabel;
                tokenTypeUnit = tokenConfigI.ok.tokenTypeUnit;
                assetTypeUnit = tokenConfigI.ok.assetTypeUnit;
                assetBalance = tokenConfigI.ok.assetToTokenExchangeRate * tokenTypeBalance.balance;
            }
        }

        tokenTypeBalanceEls.push(
            s1.linearLayoutH({ width: 'full', height: 69 }, [
                s1.linearLayoutSpacer({ size: 24 }),
                // icon
                s1.linearLayoutV({ width: 'content', height: 'full' }, [
                    s1.rectangle(24, 24, 'silver'),
                ]),
                // left text
                s1.linearLayoutSpacer({ size: 24 }),
                s1.linearLayoutV({ width: 'content', height: 'full', alignH: 'left' }, [
                    s1.text(`${tokenTypeLabel} (${tokenTypeUnit})`, { fontSize: 16 }),
                    s1.text(`Asset: ${assetBalance} ${assetTypeUnit}`, { color: 'darkgray' }),
                ]),
                s1.linearLayoutSpacer({ grow: 1 }),
                // right text
                s1.linearLayoutV({ width: 'content', height: 'full', alignH: 'right' }, [
                    s1.text(`${tokenTypeBalance.balance} ${tokenTypeUnit}`, { fontSize: 16 }),
                    s1.text(`Available: ${tokenTypeBalance.availableBalance} ${tokenTypeUnit}`, { color: 'darkgray' }),
                ]),
                // Right padding
                s1.linearLayoutSpacer({ size: 24 }),
            ]),
        );

        tokenTypeBalanceEls.push(s1.rectangle('full', 1, 'silver'));
    }
    return s1.linearLayoutV({ width: 'full', height: 'full' },
        tokenTypeBalanceEls,
    );
};

export interface DashboardProps {
    accountID: string;
    assetAndTokenConfig: r.Result<mConfig.AssetAndTokenConfig, string>;
    tokenTypeBalances: mWallet.ReadonlyTokenTypeBalances;
}
export const Dashboard = (props: DashboardProps): React.ReactElement => {
    return (<s1ImplElement.Element
        {
            ...DashboardContentFrame({
                leftAccountID: props.accountID,
                topRightText: `My Tokens (${props.tokenTypeBalances.length})`,
                leftDoughnutChart: (<div/>),
                leftDoughnutLegend: (<div/>),
                rightTokensList: tokenTypeBalancesS1({
                    tokenTypeBalances: props.tokenTypeBalances,
                    assetAndTokenConfig: props.assetAndTokenConfig,
                }),
            })
        }
    />);
};
