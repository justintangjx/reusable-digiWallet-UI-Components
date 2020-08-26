import { default as React, ReactElement } from 'react';

import {
    Table,
    TableHead,
    TableCell,
    TableRow,
    Paper,
    // TableFooter,
} from "@material-ui/core";

// ---

import { TableProps } from './models';
import { useStyles } from './styles';

import { TopBar } from './TopBar';
import { Body } from './Body';

// ---

export const PurchaseOrderTable = <ButtonID extends any>(
    props: TableProps<ButtonID>,
): ReactElement => {
    const classes = useStyles();
    return (

        <Paper className={classes.root}>

            <TopBar classes={classes} {...props.topBar} />

            <Table className={classes.table}>

                <TableHead>
                    <TableRow>
                        {props.columnHeaders.map((text, index) => (
                            <TableCell
                                className={
                                    index === 0 ?
                                        classes.firstCellBlackTextStyle :
                                        classes.cellBlackTextStyle}
                                align={"left"}
                                key={index}
                            >
                                {text}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <Body {...props.body} />

            </Table>

        </Paper>

    );
};
