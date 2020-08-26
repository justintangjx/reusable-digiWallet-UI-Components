import { Result, ok, err } from '@local/result';

import * as React from 'react';


import { Typography } from '@material-ui/core';
import Select  from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {
    AssetAndTokenConfig, assetAndTokenConfigC,
} from '@local/f-model/dist/groups/config/model';

import {
    TokenTypePair,
} from '@local/f-model/dist/v3/groups/config/index';

interface TokenPairSelectorProps {
    readonly assetAndTokenConfig: AssetAndTokenConfig;
    readonly tokenTypePairs: readonly TokenTypePair[];
    readonly value: string | null;
    readonly onSelect: (tokenTypePairID: string) => void;
}

const tokenTypePairToLabel = (assetAndTokenConfig: AssetAndTokenConfig, tokenTypePair: TokenTypePair): Result<string, string> => {
    const c = assetAndTokenConfigC(assetAndTokenConfig);
    const baseConfigResult = c.getByTokenTypeName(tokenTypePair.base);
    if (!baseConfigResult.isOk) {
        return baseConfigResult;
    }
    const baseConfig = baseConfigResult.ok;
    const counterConfigResult = c.getByTokenTypeName(tokenTypePair.counter);
    if (!counterConfigResult.isOk) {
        return counterConfigResult;
    }
    const counterConfig = counterConfigResult.ok;
    return ok(`${baseConfig.tokenTypeUnit}/${counterConfig.tokenTypeUnit}`);
}

export const TokenTypePairSelector = (props: TokenPairSelectorProps): React.ReactElement => {

    const createErrorElement = (error: string) => {
        return (<Typography color='error'>{error}</Typography>);
    }

    const assetAndTokenConfig = props.assetAndTokenConfig;
    const tokenPairOptions = props.tokenTypePairs;

    const optionsData: { value: string, label: string }[] = [];

    for (const tokenPairOption of tokenPairOptions) {
        const labelResult = tokenTypePairToLabel(assetAndTokenConfig, tokenPairOption);
        if (!labelResult.isOk) {
            return(createErrorElement(labelResult.err));
        }
        const label = labelResult.ok;
        const value = tokenPairOption.tokenTypePairID;
        optionsData.push({ label, value });
    }
    return (
        <Select
            style={{
                width: 120,
            }}
            value={props.value === null ? '' : props.value}
            onChange={(event) => {
                const newTokenTypePairID = event.target.value;
                props.onSelect(newTokenTypePairID);
            }}
        >
            {optionsData.map(({ value, label }) => (
                <MenuItem value={value}>{label}</MenuItem>
            ))}
        </Select>
    );
};