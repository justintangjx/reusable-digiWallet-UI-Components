import * as s1 from '../../../systems/system1/models';
import * as s1ProgressIndicatorModal from '../../../systems/system1/models/progressIndicatorModal';

// ---

export interface PropsNone {
    state: 'none';
}
export interface PropsProposed {
    state: 'proposed';
    onCancel: () => void;
    onConfirm: () => void;
}
export interface PropsRequestStarted {
    state: 'requestStarted';
}
export interface PropsResponseSuccess {
    state: 'responseSuccess';
    onClose: () => void;
}
export interface PropsError {
    state: 'error';
    message: string;
    onClose: () => void;
}

export type Props = PropsNone | PropsProposed | PropsRequestStarted | PropsResponseSuccess | PropsError;

export const cancelOrderWorkflowS1C = (props: Props) => {

    const proposal = props.state !== 'proposed' ?
        s1.modalPopup(false, {width: 367, height: 'content', padding: 20 }, s1.linearLayoutV({},[])) :
        s1.modalPopup(true, {width: 367, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top'  }, [
                s1.text('Confirm redemption order cancellation', {fontWeight: 500, fontSize: 20} ),
                s1.linearLayoutSpacer ({size:8}),
                s1.text('The cancellation of an order cannot be undone. If you wish to cancel this order, click “CONFIRM”.', {fontSize:16}),
                s1.linearLayoutSpacer ({size:24}),
                s1.linearLayoutH({alignH:'right', width:'full'}, [
                s1.button('CANCEL', () => { props.onCancel(); }),
                s1.linearLayoutSpacer ({size:16}),
                s1.button('CONFIRM', () => { props.onConfirm(); }, {style: 'contained'}),
                ]),
        ]));        

    const progressIndicator = props.state === 'requestStarted' ?
        s1ProgressIndicatorModal.open({
            title: 'Cancelling your order',
            body: 'Please wait...',
        }) :
        s1ProgressIndicatorModal.close({});

    const responseReceived = props.state !== 'responseSuccess' ?
        s1.modalPopup(false, {width: 280, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top' }, [])
        ) :
        s1.modalPopup(true, {width: 280, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top' }, [
                s1.text('Redemption order cancelled', {fontWeight: 500, fontSize: 20,} ),
                s1.linearLayoutSpacer ({size:8}),
                s1.text('Your redemption order has been successfully cancelled.', {fontSize:16,}),
                s1.linearLayoutSpacer ({size:24}),
                s1.linearLayoutH({alignH:'right', width:'full'}, [
                    s1.button('CLOSE', () => { props.onClose(); }),
                ]),
            ]),
        );

    const errorState = props.state !== 'error' ?
        s1.modalPopup(false, {width: 280, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top' }, [])
        ) :
        s1.modalPopup(true, {width: 280, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top' }, [
                s1.text('An error has occured while cancelling your redemption order', {fontWeight: 500, fontSize: 20, color:'red',} ),
                s1.linearLayoutSpacer ({size:8}),
                s1.text(props.message, {fontSize:16}),
                s1.linearLayoutSpacer ({size:24}),
                s1.linearLayoutH({alignH:'right', width:'full'}, [
                    s1.button('CLOSE', () => { props.onClose(); }),
                ]),
            ]),
        );

    return s1.layoutFragment([
        proposal,
        progressIndicator,
        responseReceived,
        errorState,
    ]);

};
