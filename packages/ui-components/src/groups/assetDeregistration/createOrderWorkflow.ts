import * as s1 from '../../systems/system1/models';
import * as s1c from '../../systems/system1/composite';
import * as s1ProgressIndicatorModal from '../../systems/system1/models/progressIndicatorModal';

// --- CreateOrderWorkflowProps - None ---

export interface CreateOrderWorkflowPropsNone {
    type: 'none';
}

// --- CreateOrderWorkflowProps - EditForm ---

export type CreateOrderWorkflowFormData = {
    readonly amount?: number;
    readonly assetDeregistrarID?: string;
    readonly tokenBurnerID?: string;
}

export interface CreateOrderWorkflowPropsEditForm {
    type: 'editForm';
    tokenTypeUnit: string;
    amount: number;
    tokenBurnerIDOptions: readonly string[];
    tokenBurnerID: string;
    assetDeregistrarIDOptions: readonly string[];
    assetDeregistrarID: string;
    onUpdate: (updates: Partial<CreateOrderWorkflowFormData>) => void;
    onPropose: () => void;
    onClose: () => void;
}

// --- CreateOrderWorkflowProps - Propose ---

export interface CreateOrderWorkflowPropsProposed {
    type: 'proposed';
    tokenBurnerID: string;
    assetDeregistrarID: string;
    assetTypeLabel: string;
    assetTypeUnit: string;
    assetTypeAmount: number;
    tokenTypeLabel: string;
    tokenTypeUnit: string;
    tokenTypeAmount: number;
    onReject: () => void;
    onAccept: () => void;
}

// --- CreateOrderWorkflowProps - RequestStarted ---

export interface CreateOrderWorkflowPropsRequestStarted {
    type: 'requestStarted';
}

// --- CreateOrderWorkflowProps - ResponseSuccess ---

export interface CreateOrderWorkflowPropsResponseSuccess {
    type: 'responseSuccess';
    orderID: string;
    onClose: () => void;
}

// --- CreateOrderWorkflowProps - Error ---

export interface CreateOrderWorkflowPropsError {
    type: 'error';
    message: string;
    onClose: () => void;
}

// --- CreateOrderWorkflowProps ---

export type CreateOrderWorkflowProps = 
    CreateOrderWorkflowPropsNone |
    CreateOrderWorkflowPropsEditForm |
    CreateOrderWorkflowPropsProposed |
    CreateOrderWorkflowPropsRequestStarted |
    CreateOrderWorkflowPropsResponseSuccess |
    CreateOrderWorkflowPropsError;

const s1cField = (label: string, value: string) =>
    s1c.field(label, [s1.text(value)]);

const formatNumber = (x: number): string => x.toString();

export const createOrderWorkflowS1C = (props: CreateOrderWorkflowProps) => {
    
    const form = props.type !== 'editForm' ?
        s1.modalPopup(false, {width: 367, height: 'content', padding: 20 }, s1.linearLayoutV({},[])) :
        s1.modalPopup(true, {width: 367, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top'  }, [
                s1.text('Redeem Gold token',{fontWeight: 500, fontSize: 20,} ),
                s1.linearLayoutSpacer({size:18}),
                s1.text('Please enter token quantity to redeem, appoint custodian and token burner.', {fontSize:16}),
                s1.linearLayoutSpacer({size:18}),
                s1.formInputText({
                    label: 'Amount',
                    onUpdate: value => {
                        props.onUpdate({ amount: parseInt(value) || 0 });
                    },
                    value: formatNumber(props.amount),
                    options: { endAdornment: props.tokenTypeUnit, width:'full' },
                }),
                s1.linearLayoutSpacer ({size:10}),
                s1.formInputDropwdown(
                    'Asset custodian',
                    props.assetDeregistrarID,
                    value => { try { props.onUpdate({ assetDeregistrarID: value }); } catch (e) {} },
                    props.assetDeregistrarIDOptions.map(x => ({ label: x, value: x })),
                    { width: 'full' },
                ),
                s1.linearLayoutSpacer ({size:10}),
                s1.formInputDropwdown(
                    'Token burner',
                    props.tokenBurnerID,
                    value => { try { props.onUpdate({ tokenBurnerID: value }); } catch (e) {} },
                    props.tokenBurnerIDOptions.map(x => ({ label: x, value: x })),
                    { width: 'full' },
                ),
                s1.linearLayoutSpacer ({size:24}),
                s1.linearLayoutH({alignH:'right', width:'full'}, [
                s1.button('CANCEL', () => { props.onClose(); }),
                s1.linearLayoutSpacer ({size:16}),
                s1.button('NEXT', () => { props.onPropose(); }, {style: 'contained'}),
            ]),
        ]));

    const proposal = props.type !== 'proposed' ?
        s1.modalPopup(false, {width: 367, height: 'content', padding: 20 }, s1.linearLayoutV({},[])) :
        s1.modalPopup(true, {width: 367, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top'  }, [
                s1.text('Confirm redemption details',{fontWeight: 500, fontSize: 20,} ),
                s1.linearLayoutSpacer ({size:8}),
                s1.text('Confirm the details before submitting.', {fontSize:16}),
                s1.linearLayoutSpacer ({size:8}),
                s1c.fieldList({ fieldToFieldSpacing: 6, labelToValueSpacing: 12, labelWidth: 150, layoutOptions: { alignH: 'left' } }, [
                    s1cField('Token', props.tokenTypeLabel),
                    s1cField('Token amount', `${props.tokenTypeAmount.toLocaleString()} ${props.tokenTypeUnit}`),
                    s1cField('Asset', props.assetTypeLabel),
                    s1cField('Asset amount', `${props.assetTypeAmount.toLocaleString()} ${props.assetTypeUnit}`),
                    s1cField('Custodian', props.assetDeregistrarID),
                    s1cField('Token burner', props.tokenBurnerID),
                ]),
                s1.linearLayoutSpacer ({size:24}),
                s1.linearLayoutH({alignH:'right', width:'full'}, [
                s1.button('BACK', () => { props.onReject(); }),
                s1.linearLayoutSpacer ({size:16}),
                s1.button('SUBMIT', () => { props.onAccept(); }, {style: 'contained'}),
            ]),
        ]));
    
    const progressIndicator = props.type === 'requestStarted' ?
        s1ProgressIndicatorModal.open({
            title: 'Processing your order',
            body: 'Please wait...',
        }) :
        s1ProgressIndicatorModal.close({});

    const responseReceived = props.type !== 'responseSuccess' ?
        s1.modalPopup(false, {width: 280, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top' }, [])
        ) :
        s1.modalPopup(true, {width: 420, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top' }, [
                s1.text('Redemption order created', {fontWeight: 500, fontSize: 20, color:'green'} ),
                s1.linearLayoutSpacer ({size:8}),
                s1.text(`Order ID: ${props.orderID}`, {fontWeight: 500, fontSize: 20} ),
                s1.linearLayoutSpacer ({size:24}),
                s1.text('What does your order status mean:', {fontSize:16,}),
                s1.linearLayoutSpacer ({size:24}),
                s1.text('1. Order created', {fontWeight:500,fontSize:16}),
                s1.text('Pending appointment acceptance from asset custodian and token burner.', {fontSize:14}),
                s1.linearLayoutSpacer ({size:14}),
                s1.text('2. Order accepted', {fontWeight:500,fontSize:16}),
                s1.text('Asset custodian and token burner accepted appointment.', {fontSize:14}),
                s1.linearLayoutSpacer ({size:14}),
                s1.text('3. Token burned', {fontWeight:500,fontSize:16}),
                s1.text('Your tokens have been burned. You can now redeem the assets from the custodian.', {fontSize:14}),
                s1.linearLayoutSpacer ({size:14}),
                s1.text('4. Asset deregistered', {fontWeight:500,fontSize:16}),
                s1.text('Asset custodian has deregistered and released the assets from their custody.', {fontSize:14}),
                s1.linearLayoutSpacer ({size:24}),
                s1.linearLayoutH({alignH:'right', width:'full'}, [
                    s1.button('CLOSE', () => { props.onClose(); }),
                ]),
            ]),
        );

    const errorState = props.type !== 'error' ?
        s1.modalPopup(false, {width: 280, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top' }, [])
        ) :
        s1.modalPopup(true, {width: 280, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top' }, [
                s1.text('An error has occured', {fontWeight: 500, fontSize: 20, color:'red'} ),
                s1.linearLayoutSpacer ({size:24}),
                s1.text(props.message, {fontSize:16}),
                s1.linearLayoutSpacer ({size:24}),
                s1.linearLayoutH({alignH:'right', width:'full'}, [
                    s1.button('CLOSE', () => { props.onClose(); }),
                ]),
            ]),
        );

    return s1.layoutFragment([
        form,
        proposal,
        progressIndicator,
        responseReceived,
        errorState,
    ]);

};
