import * as React from 'react';

import { ModalDialogText } from '../modalDialogText/index';



export interface Params {
    title: string;
    text: string;
}

export interface PropsOpen {
    type: 'open';
    orderID: string;
    onClose: () => void;
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
                    return (<ModalDialogText<'close'>
                        type='open'
                        title={title}
                        text={text}
                        buttons={[
                            { id: 'close', label: 'CLOSE', type: 'secondary', onClick: props.onClose },
                        ]}
                    />);
                case 'close':
                    return (<ModalDialogText<'close'> type='close' />);
            }

        };
