import React from "react";
import { FieldListPopup } from '../fieldListPopup';

export interface PropsError {
    type: 'error';
    message: string;
}

export const ErrorPopup = (props: PropsError) => (
    <FieldListPopup<null>
        isOpen={true}
        title='Order details'
        fields={[
            {
                type: 'text',
                label: 'Error',
                color: 'red',
                text: 'Error showing purchase order details: ' + props.message,
            }
        ]}
        buttons={[]}
    />
);
