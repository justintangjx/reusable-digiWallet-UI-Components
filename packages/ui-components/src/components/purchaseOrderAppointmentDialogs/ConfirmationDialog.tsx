import * as React from 'react';

import { ModalDialogText } from '../modalDialogText/index';



export interface Params {
    title: string;
    text: string;
}

export type ActionID = 'cancel' | 'confirm';

export interface PropsOpen {
    type: 'open';
    orderID: string;
    onAction: (actionID: ActionID) => void;
}

export interface PropsClose {
    type: 'close';
}

export type Props = PropsOpen | PropsClose;

export const creator =

    ({ title, text }: Params) =>

        (props: Props) => {

            switch (props.type) {
                case 'open':
                    return (<ModalDialogText<ActionID>
                        type='open'
                        title={title}
                        text={text}
                        buttons={[
                            { id: 'cancel', label: 'CANCEL', type: 'secondary', onClick: (id) => { props.onAction(id); } },
                            { id: 'confirm', label: 'CONFIRM', type: 'secondary', onClick: (id) => { props.onAction(id); } },
                        ]}
                    />);
                case 'close':
                    return (<ModalDialogText<ActionID> type='close' />);
            }

        };
