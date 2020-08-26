import * as React from "react";

import {
    ProgressIndicatorModal as ProgressIndicatorModalProps,
} from '../../models/progressIndicatorModal';

import { Context } from '../common';

import {
    SpinnerPopup,
} from '../../../../components/spinnerPopup';

export const ProgressIndicatorModal = (props: { x: ProgressIndicatorModalProps, _context?: Context }) => {
    if (props.x.open) {
        return (<SpinnerPopup
            isOpen={true}
            title={props.x.title}
            body={props.x.body}
        />);
    } else {
        return (<SpinnerPopup isOpen={false} />);
    }
};
