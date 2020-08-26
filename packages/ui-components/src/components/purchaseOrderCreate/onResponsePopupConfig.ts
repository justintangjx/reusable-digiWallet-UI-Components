export interface OkConfigStep {
    active: boolean;
    headerIcon?: 'clock' | 'tick' | 'x';
    headerText: string;
    bodyText: string;
}

type OkConfigSteps = OkConfigStep[];

interface OkConfig {
    title: string;
    steps: OkConfigSteps;
}

interface ErrConfig {
    title: string;
    body: string;
}

export const okConfig: OkConfig = {
    title: 'Order created',
    steps: [
        {
            active: true,
            headerIcon: 'clock',
            headerText: 'Order created',
            bodyText: 'Pending appointment acceptance from asset custodian and token creator',
        },
        {
            active: false,
            headerIcon: 'tick',
            headerText: 'Order accepted ',
            bodyText: 'Asset custodian and token creator accepted appointment',
        },
        {
            active: false,
            headerText: 'Asset registered ',
            bodyText: 'Asset custodian has registered the asset',
        },
        {
            active: false,
            headerText: 'Asset tokenized',
            bodyText: 'Token creator has minted token for the registered asset',
        },
        
    ],
};

export const errConfig: ErrConfig = {
    title: 'Sorry, unexpected error occurred',
    body: 'Please try again, we are sorry for the trouble.',
}; 