import { Result } from '@local/result';
import { TSup, Props } from '@local/f-workflows/dist/proposeSubmit/index';

export interface PropsAdapter<T extends TSup> {
    proposalActionDialog:
        {
            open: true;
            params: T['params'];
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
            response: Result<T['response'], string>;
            onClose: Props<T>['onClose'];
        } |
        { open: false };
}

export const propsAdapt = <T extends TSup>(origin: Props<T>): PropsAdapter<T> => {
    if (origin.state.type === 'none') {
        return {
            proposalActionDialog: { open: false },
            progressIndicator: { open: false },
            responseReceived: { open: false },
        };
    }
    return {
        proposalActionDialog: origin.state.type === 'proposed' ?
            {
                open: true,
                params: origin.state.params,
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
                response: origin.state.response,
                onClose: origin.onClose,
            } :
            { open: false },
    };
};
