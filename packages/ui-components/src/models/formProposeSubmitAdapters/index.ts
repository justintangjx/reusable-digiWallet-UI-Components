import { Result } from '@local/result';

import { TSup, Props, State } from '@local/f-workflows/dist/formProposeSubmit/index';



export interface PropsAdapter<T extends TSup> {
    formDialog:
        {
            open: true;
            params: T['params'];
            formData: T['formData'];
            onUpdateFormData: Props<T>['onUpdateFormData'];
            onFormAction: Props<T>['onFormAction'];
        } |
        { open: false };
    proposalActionDialog:
        {
            open: true;
            params: T['params'];
            formData: T['formData'];
            onProposeAction: Props<T>['onProposeAction'];
        } |
        { open: false };
    progressIndicator: {
        open: boolean;
    };
    responseReceived:
        {
            open: true;
            params: T['params'];
            formData: T['formData'];
            response: Result<T['response'], string>;
            onClose: Props<T>['onClose'];
        } |
        { open: false };
}

export const adapt = <T extends TSup>(origin: Props<T>): PropsAdapter<T> => {
    if (origin.state.type === 'none') {
        return {
            formDialog: { open: false },
            proposalActionDialog: { open: false },
            progressIndicator: { open: false },
            responseReceived: { open: false },
        };
    }
    return {
        formDialog: origin.state.type === 'editForm' ?
            {
                open: true,
                params: origin.state.params,
                formData: origin.state.formData,
                onFormAction: origin.onFormAction,
                onUpdateFormData: origin.onUpdateFormData,
            } :
            { open: false },
        proposalActionDialog: origin.state.type === 'proposed' ?
            {
                open: true,
                params: origin.state.params,
                formData: origin.state.formData,
                onProposeAction: origin.onProposeAction,
            } :
            { open: false },
        progressIndicator: origin.state.type === 'requestStarted' ?
            { open: true } :
            { open: false },
        responseReceived: origin.state.type === 'responseReceived' ?
            {
                open: true,
                params: origin.state.params,
                formData: origin.state.formData,
                response: origin.state.response,
                onClose: origin.onClose,
            } :
            { open: false },
    };
};
