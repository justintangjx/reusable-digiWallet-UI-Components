import React from "react";
import {
    TableCell,
    Button,
    Tooltip,
} from "@material-ui/core";

// ---

import {
    CellPropsText,
    CellPropsIconAndText,
    CellPropsButton,
    CellProps,
    ActionProps,
} from './models';

import { Classes, mapColor } from './styles';

import { mapIconToSvgComp } from './icons';

// ---

const TextCell = (props: CellPropsText) => (
    <TableCell
        style={{
            paddingLeft: props.isFirst ? 36 : 10,
            fontSize: 14,
            color: mapColor(props.color),
        }}
        align={"left"}
        component="th"
        scope="row"
    >
        {props.text}
    </TableCell>
);

// ---

const WrapWithTooltip = (props: { text: string; children: React.ReactElement }) => (
    <Tooltip
        disableFocusListener
        title={props.text}
        style={{
            fontSize: 12,
            letterSpacing: 0.05,
            fontWeight: 300
        }}
    >
        {props.children}
    </Tooltip>
);

const CellIconAndText = (props: CellPropsIconAndText) => (
    <TableCell
        style={{
            paddingLeft: props.isFirst ? 36 : 10,
            fontSize: 14,
            color: mapColor(props.color),
        }}
        align={"left"}
        component="th"
        scope="row"
    >
        {(() => {
            const IconComp = mapIconToSvgComp[props.icon];
            // Tooltip is designed to be only on-hover over icon 
            return props.tooltipText ?
                (<WrapWithTooltip text={props.tooltipText}><IconComp/></WrapWithTooltip>) :
                <IconComp/>
        })()}
        <span style={{ marginLeft: 3, fontWeight: 400 }}>{props.text}</span>
    </TableCell>
);

// ---

const ButtonsCell = <RowID extends any, RowAction extends any>(
    props: CellPropsButton<RowID, RowAction> & ActionProps<RowID, RowAction> & Classes,
) => {
    return (
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
                        onClick={() => { props.onAction(props.rowID, button.rowAction); }}
                    >
                        {button.label}
                    </Button>
                ))
            }
        </TableCell>
    );
};

// ---

export const Cell = <RowID, RowAction>(props: CellProps<RowID, RowAction> & ActionProps<RowID, RowAction> & Classes): React.ReactElement => {
    switch (props.type) {
        case 'text': return (<TextCell {...props} />);
        case 'iconAndText': return (<CellIconAndText {...props} />);
        case 'buttons': return (<ButtonsCell<RowID, RowAction> {...props} />);
    }
};
