import React from "react";

import { Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import { Table1 as Table1Props } from '../../models';

import * as c from '../common';
import * as m from '../../models';
import * as h from '../helpers';

import { Cell } from './Cell'
import { useStyles, mapColor } from './styles';

// ---

const styleForFullWidth = (context?: c.Context): React.CSSProperties => {
    if (context === undefined) {
        return {};
    }
    switch (context.parentLayoutType) {
        case undefined: return {};
        case 'flexColumn': return {
            alignSelf: 'stretch',
        };
        case 'flexRow': return {}; // Full-width in a flex-row parent is invalid and has no effect
        case 'flexColumnOneChild': return {
            alignSelf: 'stretch',
        };
        case 'flexRowOneChild': return {
            flexGrow: 1,
        };
    }
};

const getMarginLeft = (margin?: m.TopRightBottomLeft): number => {
    switch (typeof margin) {
        case 'undefined': return 0;
        case 'number': return margin;
        default:
            switch (margin.length) {
                case 2: return margin[1];
                case 4: return margin[3];
                default: return 0; // Should not reach this
            }
    }
};

const getMarginRight = (margin?: m.TopRightBottomLeft): number => {
    switch (typeof margin) {
        case 'undefined': return 0;
        case 'number': return margin;
        default:
            switch (margin.length) {
                case 2: return margin[1];
                case 4: return margin[1];
                default: return 0; // Should not reach this
            }
    }
};

const getInnerPaddingLeft = (innerPadding?: number | [number, number]): number => {
    switch (typeof innerPadding) {
        case 'undefined': return 0;
        case 'number': return innerPadding;
        default: return innerPadding[0];
    }
};

const getInnerPaddingRight = (innerPadding?: number | [number, number]): number => {
    switch (typeof innerPadding) {
        case 'undefined': return 0;
        case 'number': return innerPadding;
        default: return innerPadding[1];
    }
};

interface Table1MessageBodyProps {
    columnCount: number;
    iconSrc?: string;
    largeText?: string;
    smallText?: string;
}
const Table1MessageBody = (props: Table1MessageBodyProps): React.ReactElement => (
        <TableBody>
            <TableRow>
                <TableCell colSpan={props.columnCount + 2}>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 60,
                        marginBottom: 22,
                    }}>
                        {
                            props.iconSrc && 
                            <img
                                style={{
                                    height: 90,
                                    width: 80,
                                }}
                                src={props.iconSrc}
                                alt={'Loading...'}
                            />
                        }
                    </div>
                    <Typography
                        variant="h5"
                        component="h3"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            fontWeight: 450,
                            marginBottom: 8,
                        }}
                    >
                        {props.largeText}
                    </Typography>
                    <Typography
                        component='p'
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 62,
                            color: "rgba(0, 0, 0, 0.38)",
                        }}
                    >
                        {props.smallText}
                    </Typography>
                </TableCell>
            </TableRow>
        </TableBody>
    );

interface Table1DataBodyProps<RowID, RowAction> {
    rows: readonly m.Table1Row<RowID, RowAction>[];
    onAction: (rowID: RowID, rowAction: RowAction) => void;
    options: m.Table1<RowID, RowAction>['options'];
}
const Table1DataBody = <RowID, RowAction>(props: Table1DataBodyProps<RowID, RowAction>): React.ReactElement => {
    const classes = useStyles(props.options);
    return (<TableBody style={{ overflowY: 'scroll', flexGrow: 1, flexBasis: 0 }}>
        {props.rows.map((row, rowIndex) => {
            return (
                <TableRow
                    key={rowIndex}
                    hover
                    classes={{
                        hover: classes.rowOnHover,
                    }}
                >
                    <TableCell
                        style={{
                            padding: 0,
                            width: props.options.extendLeftRowLine || 0,
                        }}
                    />
                    {row.cells.map((cell, cellIndex) =>
                        (<TableCell
                            align={"left"}
                            scope="row"
                            style={{
                                padding: props.options.cellPadding ? h.formatTopRightBottomLeft(props.options.cellPadding) : undefined,
                            }}
                        >
                            <Cell
                                key={cellIndex}
                                {...cell}
                                onAction={props.onAction}
                                classes={classes}
                            />
                        </TableCell>)
                    )}
                    <TableCell
                        style={{
                            padding: 0,
                            width: props.options.extendRightRowLine || 0,
                        }}
                    />
                </TableRow>
            )
        })}
    </TableBody>);
};

export const Table1 = <RowID, RowAction>(
    props: Table1Props<RowID, RowAction> & { _context?: c.Context },
): React.ReactElement => {
    const classes = useStyles(props.options);
    const context = props._context;
    const grow = typeof context === 'undefined' ? undefined :
        context.parentLayoutType === 'flexColumn' ?
            props.options.heightGrow :
            context.parentLayoutType === 'flexRow' ?
                props.options.widthGrow :
                undefined;
    return (
        <div style={{
            width: props.options.width,
            height: props.options.height,
            flexBasis: 0,
            flexGrow: grow,
            // overflowY: 'scroll',
        }}>
            <Table style={{
                width: props.options.width,
                
                margin: props.options.margin ? h.formatTopRightBottomLeft(props.options.margin) : undefined,
                padding: props.options.padding ? h.formatTopRightBottomLeft(props.options.padding) : undefined,
                ...styleForFullWidth(props._context),
                // display: 'flex',
                // flexDirection: 'column',
                // alignItems: 'stretch',
            }}>
                <TableHead style={{ position: 'sticky' }}>
                    <TableRow>
                        <TableCell
                            style={{
                                padding: 0,
                                width: props.options.extendLeftRowLine || 0,
                            }}
                        />
                        {props.columnHeaders.map((text, index) => (
                            <TableCell
                                style={{
                                    fontSize: 14,
                                    color: 'rgba(0,0,0,0.5)',
                                    padding: props.options.cellPadding ? h.formatTopRightBottomLeft(props.options.cellPadding) : undefined,
                                }}
                                align={"left"}
                                key={index}
                                classes={{
                                    root: classes.tableDataCell,
                                }}
                            >
                                {text}
                            </TableCell>
                        ))}
                        <TableCell
                            style={{
                                padding: 0,
                                width: props.options.extendRightRowLine || 0,
                            }}
                        />
                    </TableRow>
                </TableHead>
                {props.subType === 'data' ?
                    <Table1DataBody
                            rows={props.data.rows}
                            onAction={props.data.onAction}
                            options={props.options}
                    /> :
                    <Table1MessageBody
                            columnCount={props.columnHeaders.length}
                            iconSrc={props.message.iconSrc}
                            largeText={props.message.largeText}
                            smallText={props.message.smallText}
                    />
                }
                
            </Table>
        </div>
    );
};
