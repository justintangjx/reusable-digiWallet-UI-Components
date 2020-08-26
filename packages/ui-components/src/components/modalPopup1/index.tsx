import { default as React } from 'react';

import {
    Dialog,
    DialogContent,
} from "@material-ui/core";

import * as m from './models';

import { Element } from './elements/index';

// ---

export * from './models';

export const ModalPopup1 = (props: m.ModalPopup1Props): React.ReactElement => {
    return (
        <Dialog
            open={props.open}
            maxWidth={false}
        >
            <DialogContent style={{ padding: 0 }}>
                <div style={{
                    width: props.width,
                    height: props.height,
                    padding: typeof props.padding === 'undefined' ? 24 : props.padding,
                    display: 'flex',
                    flexDirection: 'column',
                    boxSizing: 'content-box', // @todo: This shouldn't be necessary if no forced inheritance
                }}>
                    {props.elements.map((elementProps, index): React.ReactElement => (<Element key={index} {...elementProps} />))}
                </div>
            </DialogContent>
        </Dialog>
    );
};
