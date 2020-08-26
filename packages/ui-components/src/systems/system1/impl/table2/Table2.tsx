import React from "react";

import { Typography } from "@material-ui/core";

import * as m from '../../models/table2';

import * as c from '../common';
// import * as h from '../helpers';

import { Cell } from './Cell'
import * as styles from './styles';

// ---

// const styleForFullWidth = (context?: c.Context): React.CSSProperties => {
//     if (context === undefined) {
//         return {};
//     }
//     switch (context.parentLayoutType) {
//         case undefined: return {};
//         case 'flexColumn': return {
//             alignSelf: 'stretch',
//         };
//         case 'flexRow': return {}; // Full-width in a flex-row parent is invalid and has no effect
//         case 'flexColumnOneChild': return {
//             alignSelf: 'stretch',
//         };
//         case 'flexRowOneChild': return {
//             flexGrow: 1,
//         };
//     }
// };


const TrFlexSpacer = (props: { flex: [number, number, number] }): React.ReactElement =>
    (<tr style={{
        flexGrow: props.flex[0],
        flexShrink: props.flex[1],
        flexBasis: props.flex[2],
        display: 'block',
    }}/>);

const Table2MessageBody = (props: {
    x: m.Table2Message;
}): React.ReactElement => (
    <tbody style={styles.message}>
        {/* (2,1) */}
        <TrFlexSpacer flex={[1,0,20]} />
        {/* (2,2) */}
        <tr style={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Typography
                component='div'
                style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: 450,
                    marginBottom: 8,
                    color: 'rgba(0,0,0,0.2)',
                }}
            >
                {props.x.textHeader}
            </Typography>
        </tr>
        {/* (2,3) */}
        <TrFlexSpacer flex={[0,0,2]} />
        {/* (2,4) */}
        <tr style={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <td style={{ display: 'block' }}>
                <Typography
                    variant='body1'
                    component='div'
                    style={{
                        fontSize: 14,
                        fontWeight: 400,
                        textAlign: 'center',
                        color: 'rgba(0,0,0,0.5)',
                    }}
                >
                    {props.x.textBody}
                </Typography>
            </td>
        </tr>
        {/* (2,5) */}
        <TrFlexSpacer flex={[1,0,20]} />
    </tbody>);

interface Table2DataBodyProps<RowID, RowAction> {
    rows: readonly m.Row<RowID, RowAction>[];
    onAction: m.OnAction<RowID, RowAction>;
    // options: m.Table1<RowID, RowAction>['options'];
}

const Table2DataBody = <RowID, RowAction>(props: {
    x: Table2DataBodyProps<RowID, RowAction>;
    options: m.Table2<RowID, RowAction>['options'];
}): React.ReactElement => {
    // const classes = useStyles(props.options);
    return (<tbody style={styles.tbody}>
        {props.x.rows.map((row, rowIndex) => {
            return (
                <tr key={rowIndex} style={styles.row}
                    // @todo: To add onHover emphasis
                >
                    {row.cells.map((cell, cellIndex) =>
                        (<Cell
                                key={cellIndex}
                                data={cell}
                                onAction={props.x.onAction}
                                options={{
                                    margin: props.options.cellMargin,
                                    padding: props.options.cellPadding,
                                }}
                            />
                        )
                    )}
                </tr>
            );
        })}
    </tbody>);
};

export const Table2 = <RowID, RowAction>(props: {
    x: m.Table2<RowID, RowAction>;
    context?: c.Context;
}): React.ReactElement => {
    return (
        <table style={styles.outer(props.x.options, props.context)}>
            <thead style={styles.thead}>
                <tr style={styles.row}>
                    {props.x.columnHeaders.map((text, index) => (
                        <th key={index} style={styles.cellHeader({ margin: props.x.options.cellMargin, padding: props.x.options.cellPadding })}>{text} </th>
                    ))}
                </tr>
            </thead>
            {props.x.type2 === 'data' ?
                <Table2DataBody
                    x={{
                        rows: props.x.rows,
                        onAction: props.x.onAction,
                    }}
                    options={props.x.options}
                /> :
                <Table2MessageBody
                    x={props.x}
                />
            }
            
        </table>
    );
};
