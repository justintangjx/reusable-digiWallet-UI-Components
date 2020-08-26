import React from "react";
import {
    TableCell,
    Button,
    Tooltip,
    Typography,
} from "@material-ui/core";

// ---

import {
    Table1CellText,
    Table1CellIconAndText,
    Table1CellButton,
    Table1Cell,
} from '../../models';

import { Classes, mapColor } from './styles';

import { mapIconToSvgComp } from './icons';

// ---

type Table1Action<RowID, RowAction> = {
    onAction: (rowID: RowID, rowAction: RowAction) => void;
};

// ---

const TextCell = (props: Table1CellText) => (
    <>
        <Typography style={{ color: props.color || 'black' }}>{props.text}</Typography>
        
    </>
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

const CellIconAndText = (props: Table1CellIconAndText) => (
    <div style={{ whiteSpace: 'nowrap' }}>
        {(() => {
            const IconComp = mapIconToSvgComp[props.iconID];
            // Tooltip is designed to be only on-hover over icon 
            return props.tooltipText ?
                (<WrapWithTooltip text={props.tooltipText}><IconComp/></WrapWithTooltip>) :
                <IconComp color={props.color}/>
        })()}
        <span style={{ marginLeft: 3, fontWeight: 400, color: props.color }}>{props.text}</span>
    </div>
);

// ---

const ButtonsCell = <RowID extends any, RowAction extends any>(
    props: Table1CellButton<RowID, RowAction> & Table1Action<RowID, RowAction> & Classes,
) => {
    return (
        <>
            {
                props.buttons.map((button, i) => (
                    <Button
                        key={i}
                        classes={{
                            root: props.classes.buttonView,
                            label: props.classes.buttonLabel,
                        }}
                        style={{
                            marginLeft: i === 0 ? -10 : 0,
                        }}
                        onClick={() => { props.onAction(props.rowID, button.rowAction); }}
                    >
                        {button.label}
                    </Button>
                ))
            }
        </>
    );
};

// ---

export const Cell = <RowID, RowAction>(props: Table1Cell<RowID, RowAction> & Table1Action<RowID, RowAction> & Classes): React.ReactElement => {
    switch (props.type) {
        case 'text': return (<TextCell {...props} />);
        case 'iconAndText': return (<CellIconAndText {...props} />);
        case 'buttons': return (<ButtonsCell<RowID, RowAction> {...props} />);
    }
};
