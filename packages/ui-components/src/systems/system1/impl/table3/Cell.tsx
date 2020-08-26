import React from "react";
import {
    Typography,
    Button,
} from "@material-ui/core";

// ---

import * as m from '../../models/table3';
import * as vt from '../../models/values';

import * as styles from './styles';

// ---

// The parent has (is supposed to have) a CSS style of
// {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'stretch',
// }

// const cellPadding

const CellText = (props: {
    table: m.Table3;
    column: m.Column;
    data: m.CellText;
    position: 'first' | 'middle' | 'last';
}) => (
    <td style={styles.cellCommonStyle({
        table: props.table,
        column: props.column,
        position: props.position,
    })}>
        <Typography style={{ color: styles.mapColor(props.data.color || 'black'), overflowWrap: 'break-word', maxWidth: '100%' }}>{props.data.text}</Typography>
    </td>
);

const CellButtons = (props: {
    table: m.Table3;
    column: m.Column;
    data: m.CellButtons;
    position: 'first' | 'middle' | 'last';
}) => {
    const classes = styles.cellButtonButtonUseStyles();
    return (
        <td style={styles.cellCommonStyle({
            table: props.table,
            column: props.column,
            position: props.position,
        })}>
            <div style={{ marginLeft: -10, marginTop: -6 }}>
                {
                    props.data.buttons.map((button, i) => (
                        <Button
                            key={i}
                            classes={classes}
                            style={{
                                // marginLeft: i === 0 ? -10 : 0,
                            }}
                            onClick={() => { button.onAction(); }}
                        >
                            {button.label}
                        </Button>
                    ))
                }
            </div>
        </td>
    );
};

export const Cell = <RowID, RowAction>(props: {
    table: m.Table3;
    column: m.Column;
    data: m.Cell;
    position: 'first' | 'middle' | 'last';
}): React.ReactElement => {
    switch (props.data.type) {
        case 'text': return (<CellText
            table={props.table}
            column={props.column}
            data={props.data}
            position={props.position}
        />);
        case 'buttons': return (<CellButtons
            table={props.table}
            column={props.column}
            data={props.data}
            position={props.position}
        />);
    }
};
