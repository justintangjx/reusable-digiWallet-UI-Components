import * as React from 'react';
import * as m from '../../models/table3';
import * as c from '../common';

import * as styles from './styles';

import { Cell } from './Cell';
import { Typography } from '@material-ui/core';

const indexToPosition = (length: number, index: number): 'first' | 'middle' | 'last' => {
    if (index === 0) return 'first';
    if (index < length - 1) return 'middle';
    return 'last';
};


const getIndexPosition = (length: number, index: number): 'first' | 'middle' | 'last' => {
    if (index === 0) {
        return 'first';
    }
    if (index < length - 1) {
        return 'middle';
    }
    return 'last';
}

export const Table3 = (props: {
    x: m.Table3;
    context?: c.Context;
}): React.ReactElement => {
    if (props.x.content.type !== 'data') {
        return (<table style={styles.tableStyle(props.x, props.context)}>
            <thead style={{ display: 'contents' }}>
                <tr style={styles.headerRowStyle({ table: props.x })}>
                    {props.x.columns.map((column, columnIndex): React.ReactElement =>
                        (<th style={styles.columnHeaderCellStyle({
                            table: props.x,
                            column: column,
                            position: indexToPosition(props.x.columns.length, columnIndex),
                        })}><Typography style={styles.columnHeaderCellTypographyStyle}>{column.header}</Typography></th>)
                    )}
                </tr>
            </thead>
            <tbody style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ flexGrow: 1 }}/>
                <Typography style={{
                    fontSize: 20,
                    fontWeight: 450,
                    color: 'rgba(0,0,0,0.2)',
                }}>{props.x.content.textHeader}</Typography>
                <div style={{ flexBasis: 12 }}/>
                <Typography style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: 'rgba(0,0,0,0.5)',
                }}>{props.x.content.textBody}</Typography>
                <div style={{ flexGrow: 2 }}/>
            </tbody>
        </table>);
    }
    const rows = props.x.content.rows;
    return (<table style={styles.tableStyle(props.x, props.context)}>
        <thead style={{ display: 'contents' }}>
            <tr style={styles.headerRowStyle({ table: props.x })}>
                {props.x.columns.map((column, columnIndex): React.ReactElement =>
                    (<th style={styles.columnHeaderCellStyle({
                        table: props.x,
                        column: column,
                        position: indexToPosition(props.x.columns.length, columnIndex),
                    })}><Typography style={styles.columnHeaderCellTypographyStyle}>{column.header}</Typography></th>)
                )}
            </tr>
        </thead>
        <tbody style={styles.tbodyStyle(props.x)}>
            {rows.map((row, rowIndex): React.ReactElement =>
                (<tr style={styles.rowStyle({ table: props.x, context: props.context }, indexToPosition(rows.length, rowIndex))}>
                    {row.cells.map((cell, cellIndex): React.ReactElement | null => {
                        if (cellIndex >= props.x.columns.length) {
                            return null;
                        }
                        const column = props.x.columns[cellIndex];
                        return (<Cell
                            key={cellIndex}
                            table={props.x}
                            column={column}
                            data={cell}
                            position={getIndexPosition(rows.length, cellIndex)}
                        />);
                    })}
                </tr>)
            )}
        </tbody>
    </table>);
};

