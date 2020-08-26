import React from "react";

import { Typography, TableBody, TableRow, TableCell } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
    noOrdersYetIcon,
    cannotLoadResultsIcon,
} from './svgs';

import {
    BodyPropsData,
    BodyPropsError,
    BodyProps,
} from './models';

import { Cell } from './Cell'

import { Classes, useStyles } from './bodyStyles';
import { Classes as CellClasses, useStyles as cellUseStyles } from './styles';

// --

const EmptyStateBody = (
    props: Classes,
): React.ReactElement => (
        <TableBody>
            <TableRow>
                <TableCell colSpan={6}>
                    <div className={props.classes.iconContainer}>
                        <img
                            src={noOrdersYetIcon}
                            className={props.classes.emptyOrdersIcon}
                            alt={'Loading...'}
                        />
                    </div>
                    <Typography
                        variant="h5"
                        component="h3"
                        className={props.classes.title}
                    >
                        You have no orders yet
                </Typography>
                    <div className={props.classes.subTitle} />
                </TableCell>
            </TableRow>
        </TableBody>
    );

// ---

const LoadingBody = (
    props: Classes,
): React.ReactElement => (
        <TableBody>
            <TableRow>
                <TableCell colSpan={6}>
                    <div className={props.classes.iconContainer}>
                        <CircularProgress
                            size={50}
                            thickness={4.5}
                            color={"primary"}
                            className={props.classes.spinnerIcon}
                        />
                    </div>
                    <Typography
                        variant="h5"
                        component="h3"
                        className={props.classes.title}
                    >
                        Loading result...
                    </Typography>

                    <Typography
                        component="p"
                        className={props.classes.subTitle}
                    >
                        Please wait a moment
                    </Typography>
                </TableCell>
            </TableRow>
        </TableBody>
    );

// ---

const ErrorBody = (
    props: BodyPropsError & Classes,
): React.ReactElement =>
    (
        <TableBody>
            <TableRow>
                <TableCell colSpan={6}>
                    <div className={props.classes.iconContainer}>
                        <img src={cannotLoadResultsIcon} alt={'Loading...'} />
                    </div>
                    <Typography
                        variant="h5"
                        component="h3"
                        className={props.classes.title}
                    >
                        Unable to load result
                </Typography>

                    <Typography
                        component="p"
                        className={props.classes.subTitle}
                    >
                        {props.message}

                    </Typography>
                </TableCell>
            </TableRow>
        </TableBody>
    );

// ---

const DataBody = <ButtonID extends any>(
    props: BodyPropsData<ButtonID> & Classes & { cellClasses: CellClasses['classes'] },
): React.ReactElement => (
        <TableBody>
            {props.rows.map((row, rowIndex) => {
                return (
                    <TableRow
                        key={rowIndex}
                        hover
                        classes={{
                            hover: props.classes.tableRowHover
                        }} >
                        {row.cells.map((cell, cellIndex) => <Cell classes={props.cellClasses} {...cell} key={cellIndex} />)}
                    </TableRow>
                )
            })}
        </TableBody>
    );

// ---

export const Body = <ButtonID extends any>(
    props: BodyProps<ButtonID>,
): React.ReactElement => {
    const classes = useStyles();
    const cellClasses = cellUseStyles();
    switch (props.type) {
        case 'loading': return (<LoadingBody classes={classes} {...props} />);
        case 'data':
            return props.rows.length === 0 ?
                (<EmptyStateBody classes={classes} />) :
                (<DataBody cellClasses={cellClasses}  classes={classes} {...props} />);
        case 'error': return (<ErrorBody classes={classes} {...props} />);
    }
};
