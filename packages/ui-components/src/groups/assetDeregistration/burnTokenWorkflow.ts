import * as s1 from '../../systems/system1/models';
import * as s1ProgressIndicatorModal from '../../systems/system1/models/progressIndicatorModal';

// --- BurnTokenWorkflowProps - None ---

export interface BurnTokenWorkflowPropsNone {
    type: 'none';
}

// --- BurnTokenWorkflowProps - RequestStarted ---

export interface BurnTokenWorkflowPropsRequestStarted {
    type: 'requestStarted';
}

// --- BurnTokenWorkflowProps - ResponseSuccess ---

export interface BurnTokenWorkflowPropsResponseSuccess {
    type: 'responseSuccess';
    orderID: string;
    onClose: () => void;
}

// --- BurnTokenWorkflowProps - Error ---

export interface BurnTokenWorkflowPropsError {
    type: 'error';
    message: string;
    onClose: () => void;
}

// --- BurnTokenWorkflowProps ---

export type BurnTokenWorkflowProps = 
    BurnTokenWorkflowPropsNone |
    BurnTokenWorkflowPropsRequestStarted |
    BurnTokenWorkflowPropsResponseSuccess |
    BurnTokenWorkflowPropsError;

export const burnTokenWorkflowS1C = (props: BurnTokenWorkflowProps) => {

    const progressIndicator = props.type === 'requestStarted' ?
        s1ProgressIndicatorModal.open({
            title: 'Burning token',
            body: 'Please wait...',
        }) :
        s1ProgressIndicatorModal.close({});

    const responseReceived = props.type !== 'responseSuccess' ?
        s1.modalPopup(false, {width: 320, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top' }, [])
        ) :
        s1.modalPopup(true, {width: 320, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top' }, [
                s1.text('Token burned', {fontWeight: 500, fontSize: 20, color:'green'} ),
                s1.linearLayoutSpacer ({size:8}),
                s1.text(`Order ID: ${props.orderID}`, {fontWeight: 500, fontSize: 20} ),
                s1.linearLayoutSpacer ({size:24}),
                s1.text('Token burning successful. Asset will be transferred to the owner and a redemption receipt has been issued.', {fontSize:16,}),
                s1.linearLayoutSpacer ({size:24}),
                s1.linearLayoutH({alignH:'right', width:'full'}, [
                    s1.button('CLOSE', () => { props.onClose(); }),
                ]),
            ]),
        );

    const errorState = props.type !== 'error' ?
        s1.modalPopup(false, {width: 320, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top' }, [])
        ) :
        s1.modalPopup(true, {width: 320, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top' }, [
                s1.text('Order failed', {fontWeight: 500, fontSize: 20, color:'red'} ),
                s1.linearLayoutSpacer ({size:24}),
                s1.text(props.message, {fontSize:16}),
                s1.linearLayoutSpacer ({size:24}),
                s1.linearLayoutH({alignH:'right', width:'full'}, [
                    s1.button('CLOSE', () => { props.onClose(); }),
                ]),
            ]),
        );

    return s1.layoutFragment([
        progressIndicator,
        responseReceived,
        errorState,
    ]);

};
