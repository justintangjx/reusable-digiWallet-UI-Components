import React from "react";

import {
    Dialog,
    DialogActions,
    DialogContent,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Tooltip
} from "@material-ui/core";

import { DialogButtons } from "../dialogButtons/index";

import { useStyles } from './styles';
import * as models from './models';
import { mapIconToSrc } from './icons';

// ---

export const FieldListPopup = <ButtonID extends any>(
    props: models.FieldListPopup<ButtonID>,
): React.ReactElement => {
    const classes = useStyles();
    const mapDetailPropToStyle: Record<models.Color, string> = {
        'red': classes.cellRedTextStyle,
        'black': classes.cellBlackTextStyle,
    };
    return (
        <Dialog open={props.isOpen}>
            <div className={classes.orderDetailsModal}>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow className={classes.tableRowStyle}>
                                <TableCell
                                    colSpan={2}
                                    className={classes.cellHeaderStyle}>{props.title}</TableCell>
                                <TableCell className={classes.cellBlackTextStyle}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.fields.map((detail, i) => detail.type === 'text' ?
                                (
                                    <TableRow className={classes.tableRowStyle} key={i}>
                                        <TableCell align="left" className={classes.cellCategoryStyle}>{detail.label}:</TableCell>
                                        <TableCell align="left" className={mapDetailPropToStyle[detail.color]}>
                                            {detail.text}
                                        </TableCell>
                                    </TableRow>
                                ) :
                                (!detail.tooltip) ?
                                    (
                                        <TableRow className={classes.tableRowStyle} key={i}>
                                            <TableCell align="left" className={classes.cellCategoryStyle}>{detail.label}:</TableCell>
                                            <TableCell align="left" className={mapDetailPropToStyle[detail.color]}>
                                                <img src={mapIconToSrc[detail.icon]} className={classes.iconStyle} alt={'Loading...'} />
                                                <span style={{ marginLeft: 3, fontWeight: 400 }}>{detail.text}</span>
                                            </TableCell>
                                        </TableRow>
                                    ) :
                                    (
                                        <TableRow className={classes.tableRowStyle} key={i}>
                                            <TableCell align="left" className={classes.cellCategoryStyle}>{detail.label}:</TableCell>
                                            <TableCell align="left" className={mapDetailPropToStyle[detail.color]}>
                                                <Tooltip disableFocusListener title={detail.tooltip}
                                                    classes={{ tooltip: classes.tooltip }}>
                                                    <img src={mapIconToSrc[detail.icon]} className={classes.iconStyle} alt={'Loading...'} />
                                                </Tooltip>
                                                <span style={{ marginLeft: 3, fontWeight: 400 }}>{detail.text}</span>
                                            </TableCell>
                                        </TableRow>
                                    )
                            )}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <DialogButtons<ButtonID> buttons={...props.buttons} />
                </DialogActions>
            </div>
        </Dialog>
    );
};
