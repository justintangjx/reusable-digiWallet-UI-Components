import { AssetAndTokenConfig } from '@local/f-model/dist/v3/groups/config/index';
import { Order } from '@local/f-model/dist/v3/groups/assetDeregistration/index';
import * as s1 from '../../systems/system1/models';
import * as s1c from '../../systems/system1/composite';
import { assetAndTokenConfigC } from '@local/f-model/dist/config';
import { resultC } from '@local/result';

// --- Props - Close ---

export interface PropsClose {
    readonly type: "close";
}

export const propsClose = (x: Omit<PropsClose, 'type'>): PropsClose => ({
    type: 'close',
});

// --- Props - Open ---

export interface PropsOpen {
    readonly type: "open";
    readonly assetAndTokenConfig: AssetAndTokenConfig;
    readonly selfUserID: string;
    readonly order: Order;
    readonly onCancelOrder?: () => void;
    readonly onBurnToken?: () => void;
    readonly onDeregisterAsset?: () => void;
    readonly onClose: () => void;
}

export const propsOpen = (x: Omit<PropsOpen, 'type'>): PropsOpen => ({
    type: 'open',
    assetAndTokenConfig: x.assetAndTokenConfig,
    selfUserID: x.selfUserID,
    order: x.order,
    onCancelOrder: x.onCancelOrder,
    onBurnToken: x.onBurnToken,
    onDeregisterAsset: x.onDeregisterAsset,
    onClose: x.onClose,
});

// --- Props - Error ---

export interface PropsError {
    readonly type: "error";
    readonly message: string;
    readonly onClose: () => void;
}

export const propsError = (x: Omit<PropsError, 'type'>): PropsError => ({
    type: 'error',
    message: x.message,
    onClose: x.onClose,
});

// --- Props ---

export type Props =
    PropsClose |
    PropsOpen |
    PropsError;

// ---

const s1cField = (label: string, value: string) =>
    s1c.field(label, [s1.text(value)]);

const formatOrderStatus = (order: Order): readonly s1.InlineElement[] => {
    switch (order.orderStatus) {
        case 'orderCreated': return [s1.text('Order created')];
        case 'orderCancelled': return [s1.text('Order cancelled', {color: 'red'})];
        case 'orderRejected': return [s1.text('Order failed', {color: 'red'})];
        case 'orderAccepted': return [s1.text('Order accepted')];
        case 'tokenBurned': return [s1.text('Token burned')];
        case 'assetDeregistered': return [s1.text('Asset deregistered')];
    }
};

const formatBodyTextGroup1 = (selfUserID: string, order: Order): readonly s1.LayoutElement[] => {
    if (order.orderStatus === 'tokenBurned' && order.creatorID === selfUserID) {
        return [
            s1.linearLayoutSpacer({size:8}),
            s1.text('Your tokens has been burned. You can now redeem the assets from custodian.', {fontWeight: 500, fontSize: 16}),
            s1.linearLayoutSpacer({size:16}),
        ];
    }
    if (order.orderStatus === 'assetDeregistered' && order.creatorID === selfUserID) {
        return [
            s1.linearLayoutSpacer({size:8}),
            s1.text('Asset custodian has deregistered and released the assets from their custody.', {fontWeight: 500, fontSize: 16}),
            s1.linearLayoutSpacer({size:16}),
        ];
    }
    return [];
};

const createFieldsForTimestamps = (order: Order): {
    label: string;
    value: readonly s1.InlineElement[];
}[] => {
    switch (order.orderStatus) {
        case 'orderCreated':
        case 'orderCancelled':
        case 'orderRejected':
        case 'orderAccepted': return [
            s1cField('Created on', 'Not available'),
        ];
        case 'tokenBurned': return [
            s1cField('Token burned on', 'Not available'),
        ];
        case 'assetDeregistered': return [
            s1cField('Deregistered on', 'Not available'),
        ];
    }
};

const formatPopupHeader = (selfUserID: string, order: Order): string => {
    if (selfUserID === order.tokenBurnerID || selfUserID === order.assetDeregistrarID) {
        return 'Redemption order details';
    }
    switch (order.orderStatus) {
        case 'orderCreated':
        case 'orderCancelled':
        case 'orderRejected':
        case 'orderAccepted':
            return 'Redemption order details';
        case 'tokenBurned':
        case 'assetDeregistered':
            return 'Redemption receipt';
    }
}

const formatActionBar = (props: PropsOpen): s1.LayoutElement => {
    const selfUserID = props.selfUserID;
    const order = props.order;
    const onCancelOrder = props.onCancelOrder;
    const onBurnToken = props.onBurnToken;
    const onDeregisterAsset = props.onDeregisterAsset;

    if (selfUserID === order.creatorID) {
        return s1.linearLayoutH({alignH:'right', width:'full'}, [
            ...(onCancelOrder ?
                [s1.button('CANCEL ORDER', () => { onCancelOrder(); }),
                s1.linearLayoutSpacer ({size:16})] :
                []
            ),
            s1.button('CLOSE', () => { props.onClose(); }),
        ]);
    }
    if (selfUserID === order.tokenBurnerID) {
        return s1.linearLayoutH({alignH:'right', width:'full'}, [
            s1.button('CANCEL', () => { props.onClose(); }),
            ...(onBurnToken ?
                [s1.linearLayoutSpacer ({size:16}),
                s1.button('BURN TOKEN', () => { onBurnToken(); }, { style: 'contained' })] :
                []
            ),
        ]);
    }
    if (selfUserID === order.assetDeregistrarID) {
        return s1.linearLayoutH({alignH:'right', width:'full'}, [
            s1.button('CANCEL', () => { props.onClose(); }),
            ...(onDeregisterAsset ?
                [s1.linearLayoutSpacer ({size:16}),
                s1.button('DEREGISTER', () => { onDeregisterAsset(); }, { style: 'contained' })] :
                []
            ),
        ]);
    }
    return s1.linearLayoutH({alignH:'right', width:'full'}, []);
}

export const orderDetailsPopupS1C = (props: Props) => {
    if (props.type === 'error') {
        return s1.modalPopup(true, {width: 367, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top'  }, [
                s1.text('Redemption order details',{fontWeight: 500, fontSize: 20,} ),
                s1.linearLayoutSpacer ({size:8}),
                s1.text('An error has occured', {fontWeight: 500, fontSize: 20, color: 'red'} ),
                s1.linearLayoutSpacer ({size:24}),
                s1.text(props.message, {fontSize:16}),
                s1.linearLayoutSpacer ({size:24}),
                s1.linearLayoutH({alignH:'right', width:'full'}, [
                    s1.button('CLOSE', () => { props.onClose(); }),
                ]),
            ]),
        );
    }
    if (props.type === 'close') {
        return s1.modalPopup(false, {width: 367, height: 'content', padding: 20 }, s1.linearLayoutV({},[]));
    }
    if (props.type === 'open') {
        const order = props.order;
        const assetAndTokenConfig = props.assetAndTokenConfig;
        const atcResultc = resultC(assetAndTokenConfigC(assetAndTokenConfig).getByAssetTypeName(order.assetTypeName));
        const tokenTypeLabel = atcResultc.map(x => x.tokenTypeLabel).unwrapOr('Error: Could not find token type');
        const tokenTypeUnit = atcResultc.map(x => x.tokenTypeUnit).unwrapOr('');
        const assetTypeLabel = atcResultc.map(x => x.assetTypeLabel).unwrapOr('Error: Could not find asset type');
        const assetTypeUnit = atcResultc.map(x => x.assetTypeUnit).unwrapOr('');
        return s1.modalPopup(true, {width: 460, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top'  }, [
                s1.text(formatPopupHeader(props.selfUserID, order), {fontWeight: 500, fontSize: 20}),
                s1.linearLayoutSpacer ({size:8}),
                ...formatBodyTextGroup1(props.selfUserID, props.order),
                s1c.fieldList({ fieldToFieldSpacing: 6, labelToValueSpacing: 12, labelWidth: 130, layoutOptions: { alignH: 'left' } }, [
                    s1cField('Order ID', order.orderID),
                    s1c.field('Status', formatOrderStatus(order)),
                    ...createFieldsForTimestamps(order),
                    s1cField('Token', tokenTypeLabel),
                    s1cField('Token amount', `${order.assetValue.toLocaleString()} ${tokenTypeUnit}`),
                    s1cField('Asset', assetTypeLabel),
                    s1cField('Asset amount', `${order.assetValue.toLocaleString()} ${assetTypeUnit}`),
                    s1cField('Owner', order.creatorID === props.selfUserID ? 'You' : order.creatorID),
                    s1cField('Custodian', order.assetDeregistrarID === props.selfUserID ? 'You' : order.assetDeregistrarID),
                    s1cField('Token burner', order.tokenBurnerID === props.selfUserID ? 'You' : order.tokenBurnerID),
                ]),
                s1.linearLayoutSpacer ({size:24}),
                formatActionBar(props),
            ]),
        );
    }
};
