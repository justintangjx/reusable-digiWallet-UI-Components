import * as vt from '../../../../systems/system1/models/values';
import * as mConfig from '@local/f-model/dist/groups/config/model';
import * as mMarketplace from '@local/f-model/dist/groups/mktpl/index';
import * as mWallet from '@local/f-model/dist/groups/wallet/index';

import { ITs } from '@local/f-model/dist/workflows/formProposeSubmit/groups/mktpl/index';

import * as workflowFormProposeSubmit from '@local/f-workflows/dist/formProposeSubmit/index';

import * as s1 from '../../../../systems/system1/models';

export interface BuySellFormPropsOuterLayout {
    readonly margin?: s1.TopRightBottomLeft;
    readonly padding?: s1.TopRightBottomLeft;
    readonly width?: s1.DimensionSize;
    readonly height?: s1.DimensionSize;
}

interface BuySellFormPropsContentMessage {
    readonly type: 'message';
    readonly message: {
        readonly header: string;
        readonly body: string;
    };
}

interface BuySellFormPropsContentData {
    readonly type: 'data';
    readonly data: {
        readonly assetAndTokenConfiguration: mConfig.AssetAndTokenConfig;
        readonly tokenBalances: mWallet.ReadonlyTokenTypeBalances;
        readonly tokenPair: mMarketplace.TokPair;
    };
}

type BuySellFormPropsContent =
    BuySellFormPropsContentData |
    BuySellFormPropsContentMessage;

interface BuySellFormProps {
    outerLayout: BuySellFormPropsOuterLayout;
    content: BuySellFormPropsContent;
    readonly workflowProps: workflowFormProposeSubmit.Props<ITs['sell']>;
}

interface BuySellFormMessageProps {
    outerLayout: BuySellFormPropsOuterLayout;
    header: string;
    body: string;
}

export interface BuySellFormFormData {
    readonly price: string;
    readonly quantity: string;
}

interface BuySellFormDataS1CProps {
    buyOrSell: 'buy' | 'sell';
    outerLayout: {
        width?: vt.DimensionSize;
        widthGrow?: number;
        height?: vt.DimensionSize;
        heightGrow?: number;
        margin?: vt.TopRightBottomLeft;
    };
    baseLabel: string;
    baseUnit: string;
    counterUnit: string;
    availableBalance: number;
    availableBalanceTokenUnit: string;
    formData: BuySellFormFormData;
    onUpdate: (updates: Partial<BuySellFormFormData>) => void;
    onSubmit: () => void;
}

const buySellFormDataS1C = (props: BuySellFormDataS1CProps): s1.LayoutElement => {
    const {
        buyOrSell,
        outerLayout: {
            width,
            widthGrow,
            height,
            heightGrow,
            margin,
        },
        baseLabel,
        baseUnit,
        availableBalance,
        availableBalanceTokenUnit,
        counterUnit,
        formData: { price, quantity },
        onUpdate,
        onSubmit,
    } = props;
    const buyOrSellLabel = buyOrSell === 'buy' ? 'Buy' : 'Sell';
    // @todo: Width grow is wrong
    return s1.linearLayoutV({ width, height, grow: widthGrow, margin, alignH: 'left' }, [
        s1.text(`${buyOrSellLabel} ${baseLabel} (${baseUnit})`, { fontWeight: 500, fontSize: 20 }),
        s1.linearLayoutSpacer({ size: 16 }),
        s1.linearLayoutH({}, [
            s1.text(`Available balance: `, { fontSize: 16 }),
            s1.text(`${availableBalance} ${availableBalanceTokenUnit}`, { fontSize: 16, fontWeight: 500 }),
        ]),
        s1.linearLayoutSpacer({ size: 24 }),
        s1.formInputText({
            label: 'Price',
            value: price,
            onUpdate: (newValue) => { onUpdate({ price: newValue }); },
            options: { endAdornment: counterUnit },
        }),
        s1.linearLayoutSpacer({ size: 24 }),
        s1.formInputText({
            label: 'Amount',
            value: quantity,
            onUpdate: (newValue) => { onUpdate({ quantity: newValue }); },
            options: { endAdornment: baseUnit },
        }),
        s1.linearLayoutSpacer({ size: 12, grow: 1 }),
        buyOrSell === 'buy' ?
            s1.button('BUY', onSubmit, { height:44, width: 'full', style: 'contained', color: 'green' }) :
            s1.button('SELL', onSubmit, { height:44, width: 'full', style: 'contained', color: 'red' }),
        s1.linearLayoutSpacer({ size: 18 }),
    ]);
}

export interface QBuySellFormDataS1CProps {
    outerLayout: {
        width?: vt.DimensionSize;
        height?: vt.DimensionSize;
        margin?: vt.TopRightBottomLeft;
    };
    baseLabel: string;
    baseUnit: string;
    counterUnit: string;
    baseAvailableBalance: number;
    counterAvailableBalance: number;
    buyForm: {
        formData: BuySellFormFormData;
        onUpdate: (updates: Partial<BuySellFormFormData>) => void;
        onSubmit: () => void;
    };
    sellForm: {
        formData: BuySellFormFormData;
        onUpdate: (updates: Partial<BuySellFormFormData>) => void;
        onSubmit: () => void;
    };
}

export const s1cData = (props: QBuySellFormDataS1CProps): s1.PaperBlock => {
    const {
        outerLayout,
        baseLabel,
        baseUnit,
        counterUnit,
        baseAvailableBalance,
        counterAvailableBalance,
        buyForm,
        sellForm,
    } = props;
    return s1.paperBlock({
        height: outerLayout.height,
        width: outerLayout.width,
        margin: outerLayout.margin,
        overflowY: 'scroll',
    }, s1.linearLayoutH({ width: 'full', height: 'full', alignV: 'top' }, [
        buySellFormDataS1C({
            outerLayout: {
                height: 'full',
                width: 0,
                widthGrow: 1,
                margin: 20,
            },
            buyOrSell: 'buy',
            baseLabel,
            baseUnit,
            counterUnit,
            availableBalance: counterAvailableBalance,
            availableBalanceTokenUnit: counterUnit,
            formData: buyForm.formData,
            onUpdate: buyForm.onUpdate,
            onSubmit: buyForm.onSubmit,
        }),
        s1.rectangle(1, 'full', 'silver'),
        buySellFormDataS1C({
            outerLayout: {
                height: 'full',
                width: 0,
                widthGrow: 1,
                margin: 20,
            },
            buyOrSell: 'sell',
            baseLabel,
            baseUnit,
            counterUnit,
            availableBalance: baseAvailableBalance,
            availableBalanceTokenUnit: baseUnit,
            formData: sellForm.formData,
            onUpdate: sellForm.onUpdate,
            onSubmit: sellForm.onSubmit,
        }),
    ]));
};


export interface QBuySellFormMessageS1CProps {
    outerLayout: {
        width?: vt.DimensionSize;
        height?: vt.DimensionSize;
        margin?: vt.TopRightBottomLeft;
    };
    message: {
        header: string;
        body: string;
    };
}
export const s1cMessage = (props: QBuySellFormMessageS1CProps): s1.PaperBlock => {
    const {
        outerLayout,
        message: {
            header,
            body,
        },
    } = props;
    return s1.paperBlock({
        height: outerLayout.height,
        width: outerLayout.width,
        margin: outerLayout.margin,
        overflowY: 'scroll',
    }, s1.linearLayoutV({ width: 'full', height: 'full', alignH: 'center', alignV: 'center' }, [
        s1.linearLayoutSpacer({ grow: 1 }),
        s1.text(header, { fontSize: 20, fontWeight: 450 }),
        s1.linearLayoutSpacer({ size: 12 }),
        s1.text(body, { fontSize: 14 }),
        s1.linearLayoutSpacer({ grow: 2 }),
    ]));
};
