import { CancelOrderProposeSubmitTypes } from '@local/f-model/dist/groups/assetTokenization/index';
import * as workflowProposeSubmit from '@local/f-workflows/dist/proposeSubmit/index';

import * as s1 from '../../../systems/system1/models';
import * as s1ProgressIndicatorModal from '../../../systems/system1/models/progressIndicatorModal';

type Props = workflowProposeSubmit.Props<CancelOrderProposeSubmitTypes>;

export const cancelOrderS1C = (props: Props) => {

    const proposal = props.state.type === 'proposed' ?
        s1.modalPopup(true, {width: 367, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top'  }, [
                s1.text(`Confirm order cancellation`, { fontWeight: 500, fontSize: 20 } ),
                s1.linearLayoutSpacer ({size:8}),
                s1.text(`The cancellation of an order cannot be undone. If you wish to cancel this order, click “CONFIRM”`, { fontSize:16 }),
                s1.linearLayoutSpacer ({size:24}),
                s1.linearLayoutH({alignH:'right', width:'full'}, [
                    s1.button('CANCEL', () => { props.onProposeAction('reject'); }),
                    s1.linearLayoutSpacer ({size:16}),
                    s1.button('CONFIRM', () => { props.onProposeAction('accept'); }, {style: 'contained'}),
                ]),
            ])
        ) :
        s1.modalPopup(false, {width: 367, height: 'content', padding: 20 }, s1.linearLayoutV({},[]));

    const progressIndicator = props.state.type === 'requestStarted' ?
        s1ProgressIndicatorModal.open({
            title: 'Cancelling your order',
            body: 'Please wait...',
        }) :
        s1ProgressIndicatorModal.close({});

    const responseReceived = props.state.type === 'responseReceived' ?
        props.state.response.isOk ?
            s1.modalPopup(true, {width: 280, height: 'content', padding: 20 },
                s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top' }, [
                    s1.text('Order cancelled', {fontWeight: 500, fontSize: 20,} ),
                    s1.linearLayoutSpacer ({size:8}),
                    s1.text('Your order has been successfully cancelled.', {fontSize:16,}),
                    s1.linearLayoutSpacer ({size:24}),
                    s1.linearLayoutH({alignH:'right', width:'full'}, [
                        s1.button('CLOSE', () => { props.onClose(); }),
                    ]),
                ]),
            ) :
            s1.modalPopup(true, {width: 280, height: 'content', padding: 20 },
                s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top' }, [
                    s1.text('An error has occured', {fontWeight: 500, fontSize: 20, color:'red',} ),
                    s1.linearLayoutSpacer ({size:8}),
                    s1.text(props.state.response.err, {fontSize: 16}),
                    s1.linearLayoutSpacer ({size:24}),
                    s1.linearLayoutH({alignH:'right', width:'full'}, [
                        s1.button('CLOSE', () => { props.onClose(); }),
                    ]),
                ]),
            ) :
            s1.modalPopup(false, {width: 280, height: 'content', padding: 20 },
                s1.linearLayoutV({}, []),
            );

    return s1.layoutFragment([
        proposal,
        progressIndicator,
        responseReceived,
    ]);

};
