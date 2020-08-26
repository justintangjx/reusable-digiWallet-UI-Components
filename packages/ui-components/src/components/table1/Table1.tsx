import React from "react";

import { Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";

import { Table1Props } from './models';
import { Cell } from './Cell'
import { useStyles } from './styles';

// ---

export const Table1 = <RowID, RowAction>(
    props: Table1Props<RowID, RowAction>,
): React.ReactElement => {
    const classes = useStyles();
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {props.columnHeaders.map((text, index) => (
                        <TableCell
                            style={{
                                fontSize: 14,
                                color: "#222222",
                                paddingLeft: 10
                            }}
                            align={"left"}
                            key={index}
                        >
                            {text}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {props.rows.map((row, rowIndex) => {
                    return (
                        <TableRow
                            key={rowIndex}
                            hover
                            classes={{
                                hover: classes.rowOnHover,
                            }}
                        >
                            {row.cells.map((cell, cellIndex) =>
                                (<Cell
                                    key={cellIndex}
                                    {...cell}
                                    onAction={() => {}}
                                    classes={classes}
                                />)
                            )}
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    );
};
