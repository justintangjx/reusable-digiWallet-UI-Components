import * as s1 from '../../../../systems/system1/models';
import * as s1x from '../../../../systems/system1/composite';

export interface PropsOk {
    type: 'ok';
    price: string;
    quantity: string;
    value: string;
    baseUnit: string;
    baseLabel: string;
    counterUnit: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export interface PropsError {
    type: 'error';
    error: string;
    onCancel: () => void;
}

export interface PropsClose {
    type: 'close';
}

export type Props =
    PropsOk |
    PropsError |
    PropsClose;

const buyOrSellS1C = (buyOrSell: 'buy' | 'sell') =>
    (props: Props): s1.ModalPopup => {
        if (props.type === 'close') {
            return s1.modalPopup(false, {}, s1.linearLayoutV({}, []));
        }
        // ---
        if (props.type === 'error') {
            const onCancel = props.onCancel;
            return s1.modalPopup(true, { width: 328 },
                s1.linearLayoutV({ alignH: 'left', padding: 20 }, [
                    s1.text(`Confirm ${buyOrSell} order (An error has ocurred)`, { fontWeight: 500, fontSize: 20, color: 'red' }),
                    s1.linearLayoutSpacer({ size: 8 }),
                    s1.text(props.error, { fontSize: 16, fontWeight: 500 }),
                    s1.linearLayoutSpacer({ size: 24 }),
                    s1.linearLayoutH({ alignH: 'right', width: 'full' }, [
                        s1.button('CANCEL', onCancel),
                    ]),
                ]),
            );
        }
        // ---
        const {
            price,
            quantity,
            baseUnit,
            baseLabel,
            counterUnit,
            onCancel,
            onConfirm,
        } = props;
        return s1.modalPopup(true, { width: 328 },
            s1.linearLayoutV({ alignH: 'left', padding: 20 }, [
                s1.text(`Confirm ${buyOrSell} order`, { fontWeight: 500, fontSize: 20 }),
                s1.linearLayoutSpacer({ size: 8 }),
                s1.text('Confirm the details before submitting', { fontSize: 16 }),
                s1.linearLayoutSpacer({ size: 12 }),
                s1x.fieldList({ fieldToFieldSpacing: 8, labelToValueSpacing: 6, labelWidth: 60, layoutOptions: {} }, [
                    s1x.field('Token', [s1.text(baseLabel)]),
                    s1x.field('Amount', [s1.text(`${quantity} ${baseUnit}`)]),
                    s1x.field('Price', [s1.text(`${price} ${counterUnit}`)]),
                    // @todo: To compute value separately and catch a parse error, display the message state instead
                    s1x.field('Total', [s1.text(`${(parseInt(price) * parseInt(quantity)).toString()} ${counterUnit}`)]),
                ]),
                s1.linearLayoutSpacer({ size: 24 }),
                s1.linearLayoutH({ alignH: 'right', width: 'full' }, [
                    s1.button('CANCEL', onCancel),
                    s1.linearLayoutSpacer({ size: 16 }),
                    s1.button('CONFIRM', onConfirm, { style: 'contained' }),
                ]),
            ]),
        );
};

export const buyS1C = buyOrSellS1C('buy');
export const sellS1C = buyOrSellS1C('sell');
