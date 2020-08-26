import {
    InstanceID,
    fillInstancesRecordWithFunction,
} from '@local/f-model/dist/purchaseOrder/confirmationByDialog';
import {
    Params as ConfirmationDialogParams,
    creator as confirmationDialogCreator,
    Props as ConfirmationDialogProps,
} from './ConfirmationDialog';

import {
    Params as SuccessAcknowledgementPopupParams,
    creator as sucecssAcknowledgementPopupCreator,
    Props as SuccessAcknowledgementPopupProps,
} from './SuccessAcknowledgementPopup';



export {
    Params as ConfirmationDialogParams,
    creator as confirmationDialogCreator,
    Props as ConfirmationDialogProps,
} from './ConfirmationDialog';

export {
    Params as SuccessAcknowledgementPopupParams,
    creator as sucecssAcknowledgementPopupCreator,
    Props as SuccessAcknowledgementPopupProps,
} from './SuccessAcknowledgementPopup';

export interface ConfirmationComponents {
    ConfirmationDialog: React.ComponentType<ConfirmationDialogProps>;
    SuccessAcknowledgementPopup: React.ComponentType<SuccessAcknowledgementPopupProps>;
}

interface ConfirmationParams {
    confirmationDialog: ConfirmationDialogParams;
    successAcknowledgementPopup: SuccessAcknowledgementPopupParams;
}

const createConfirmationComponents = (params: ConfirmationParams): ConfirmationComponents =>
    ({
        ConfirmationDialog: confirmationDialogCreator(params.confirmationDialog),
        SuccessAcknowledgementPopup: sucecssAcknowledgementPopupCreator(params.successAcknowledgementPopup),
    });

const confirmationParamsByInstanceID: Record<InstanceID, ConfirmationParams> = {
    assetCustodianAccept: {
        confirmationDialog: {
            title: 'Accept this appointment',
            text: 'By accepting this appointment, you will have custody over the asset. You hereby accept the responsibility to check, verify, and register the asset.\n\nThis action cannot be undone. If you sure, click "CONFIRM".',
        },
        successAcknowledgementPopup: {
            title: 'You have accepted this appointment',
            text: 'You are now able to register this asset. Owner will be notified.',
        },
    },
    assetCustodianReject: {
        confirmationDialog: {
            title: 'Reject this appointment',
            text: 'Are you sure? This action cannot be undone. If you are sure, click "CONFIRM"',
        },
        successAcknowledgementPopup: {
            title: 'You rejected this appointment',
            text: 'Owner will be notified.',
        },
    },
    tokenCreatorAccept: {
        confirmationDialog: {
            title: 'Accept this appointment',
            text: 'By accepting this appointment, you hereby accept the responsibility to mint token for the asset.\n\nThis action cannot be undone. If you are sure, click “CONFIRM”',
        },
        successAcknowledgementPopup: {
            title: 'You have accepted this appointment',
            text: 'You are now able to mint token for this asset. Owner will be notified.',
        },
    },
    tokenCreatorReject: {
        confirmationDialog: {
            title: 'Reject this appointment',
            text: 'Are you sure? This action cannot be undone. If you are sure, click "CONFIRM"',
        },
        successAcknowledgementPopup: {
            title: 'You rejected this appointment',
            text: 'Owner will be notified.',
        },
    },
};

export const confirmationComponentsByInstanceId: Record<InstanceID, ConfirmationComponents> =
    fillInstancesRecordWithFunction(
        (instanceID) =>
            createConfirmationComponents(confirmationParamsByInstanceID[instanceID]),
    );
