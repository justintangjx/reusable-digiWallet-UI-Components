import * as s1 from '../../../../systems/system1/models';

interface PropsClose {
    type: 'close';
}

export interface PropsOk {
    type: 'ok';
    orderID: string;
    onClose: () => void;
}

export interface PropsError {
    type: 'error';
    error: string;
    onClose: () => void;
}

export type Props =
    PropsClose |
    PropsOk |
    PropsError;

export const s1c = (props: Props): s1.ModalPopup => {
    if (props.type === 'close') {
        return s1.modalPopup(false, {}, s1.linearLayoutV({}, []));
    }
    // ---
    if (props.type === 'error') {
        const {
            onClose,
        } = props;
        return s1.modalPopup(true, {width: 280, height: 'content', padding: 20 },
            s1.linearLayoutV({ width: 'content', height: 'content', alignH: 'left', alignV: 'top', } , [
                s1.text('An error has occured', { fontWeight: 500, fontSize: 20, color:'red',}),
                s1.linearLayoutSpacer({ size: 8 }),
                s1.text(props.error, {fontSize: 16}),
                s1.linearLayoutSpacer ({size:24}),
                s1.linearLayoutH({ width: 'full', alignH: 'right' }, [
                    s1.button('CLOSE', onClose),
                ]),
            ]),
        );
    }
    const {
        orderID,
        onClose,
    } = props;
    return s1.modalPopup(true, {width: 367, height: 'content', padding: 20},
        s1.linearLayoutV({ width: 'content', height: 'content', alignH: 'left', alignV: 'top',}, [
            s1.text('Order placed successfully', { fontWeight: 500, fontSize: 20, color:'green', }),
            s1.linearLayoutSpacer({ size: 2 }),
            s1.text(`Order ID: ${orderID}`, {fontWeight: 500, fontSize: 20,}),
            s1.linearLayoutSpacer({ size: 8 }),
            s1.text('Your order will appear in Open Order tab. Once the order is fulfilled, you will see the corresponding trade in order history tab.', {fontSize: 16,}),
            s1.linearLayoutSpacer ({size:24}),
            s1.linearLayoutH({ width: 'full', alignH: 'right' }, [
                s1.button('CLOSE', onClose),
            ]),
        ])
    );
};
