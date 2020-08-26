import * as s1 from '../../systems/system1/models';
import * as s1ProgressIndicatorModal from '../../systems/system1/models/progressIndicatorModal';

// --- DeregisterAssetWorkflowProps - None ---

export interface DeregisterAssetWorkflowPropsNone {
    type: 'none';
}

// --- DeregisterAssetWorkflowProps - RequestStarted ---

export interface DeregisterAssetWorkflowPropsRequestStarted {
    type: 'requestStarted';
}

// --- DeregisterAssetWorkflowProps - ResponseSuccess ---

export interface DeregisterAssetWorkflowPropsResponseSuccess {
    type: 'responseSuccess';
    orderID: string;
    onClose: () => void;
}

// --- DeregisterAssetWorkflowProps - Error ---

export interface DeregisterAssetWorkflowPropsError {
    type: 'error';
    message: string;
    onClose: () => void;
}

// --- DeregisterAssetWorkflowProps ---

export type DeregisterAssetWorkflowProps = 
    DeregisterAssetWorkflowPropsNone |
    DeregisterAssetWorkflowPropsRequestStarted |
    DeregisterAssetWorkflowPropsResponseSuccess |
    DeregisterAssetWorkflowPropsError;

export const deregisterAssetWorkflowS1C = (props: DeregisterAssetWorkflowProps) => {

    const progressIndicator = props.type === 'requestStarted' ?
        s1ProgressIndicatorModal.open({
            title: 'Deregistering assets',
            body: 'Please wait...',
        }) :
        s1ProgressIndicatorModal.close({});

    const responseReceived = props.type !== 'responseSuccess' ?
        s1.modalPopup(false, {width: 280, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top' }, [])
        ) :
        s1.modalPopup(true, {width: 280, height: 'content', padding: 20 },
            s1.linearLayoutV({width: 'content', height: 'content', alignH: 'left', alignV: 'top' }, [
                s1.text('Asset deregistered', {fontWeight: 500, fontSize: 20, color:'green'} ),
                s1.linearLayoutSpacer ({size:8}),
                s1.text(`Order ID: ${props.orderID}`, {fontWeight: 500, fontSize: 20} ),
                s1.linearLayoutSpacer ({size:24}),
                s1.text('Asset deregistration successful. Asset will be marked as released.', {fontSize:16,}),
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
        progressIndicator,
        responseReceived,
        errorState,
    ]);

};
