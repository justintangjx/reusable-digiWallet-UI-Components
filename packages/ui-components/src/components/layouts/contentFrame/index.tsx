import * as React from "react";

import { useStyles } from './styles';

// @todo: To redo this as a linear layout model, instead of going into React DOM directly
export const OuterFrame = (props: { children?: React.ReactNode[] }): React.ReactElement => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    );
};
