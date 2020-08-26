import React from "react";
import {
    TableCell,
    Button,
    Tooltip
} from "@material-ui/core";

// ---

import * as models from './models';
import { Classes } from './styles';

// ---

const TextCell = (props: models.CellPropsText & Classes) => (
    <TableCell
        className={models.colorIDToClassName(props.classes, props.color)}
        align={"left"}
        component="th"
        scope="row"
    >
        {props.text}
    </TableCell>
);

// ---

const WrapWithTooltip = (props: { text: string; children: React.ReactElement } & Classes) => (
    <Tooltip
        disableFocusListener
        title={props.text}
        classes={{ tooltip: props.classes.tooltip }}>
        {props.children}
    </Tooltip>
);

const IconAndTextCell = (props: models.CellPropsIconAndText & Classes) => (
    <TableCell
        className={models.colorIDToClassName(props.classes, props.color)}
        align={"left"}
        component="th"
        scope="row"
    >
        {(() => {
            // Tooltip is designed to be only on-hover over icon 
            const image = (<img src={models.iconIDToSrc[props.iconID]} className={props.classes.iconStyle} alt='loading...' />);
            return props.tooltipText ?
                (<WrapWithTooltip classes={props.classes} text={props.tooltipText}>{image}</WrapWithTooltip>) :
                image
        })()}
        <span style={{ marginLeft: 3, fontWeight: 400 }}>{props.text}</span>
    </TableCell>
);

// ---

const ButtonsCell = <ButtonID extends any>(props: models.CellPropsButton<ButtonID> & Classes) => (
    <TableCell
        className={props.classes.buttonCell}
        align={"left"}
        component="th"
        scope="row"
    >
        {
            props.buttons.map((button, i) => (
                <Button
                    key={i}
                    classes={{
                        root: props.classes.buttonView,
                        label: props.classes.buttonLabel,
                    }}
                    onClick={() => { props.onClick(props.rowID, button.buttonID); }}
                >
                    {button.label}
                </Button>
            ))
        }
    </TableCell>
);

// ---

export const Cell = <ButtonID extends any>(props: models.CellProps<ButtonID> & Classes): React.ReactElement => {
    switch (props.type) {
        case 'text': return (<TextCell {...props} />);
        case 'iconAndText': return (<IconAndTextCell {...props} />);
        case 'buttons': return (<ButtonsCell {...props} />);
    }
};
