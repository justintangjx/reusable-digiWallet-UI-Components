import React from "react";
import {
    Typography,
} from "@material-ui/core";

// ---

import * as m from '../../models/table2';
import * as vt from '../../models/values';

import * as s from './styles';

// ---

// The parent has (is supposed to have) a CSS style of
// {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'stretch',
// }

const CellText = (props: {
    data: m.CellText;
    options: {
        margin?: vt.TopRightBottomLeft;
        padding?: vt.TopRightBottomLeft;
    };
}) => (
    <td style={s.cellText(props.options)}>
        <Typography style={{ color: s.mapColor(props.data.color || 'black') }}>{props.data.text}</Typography>
    </td>
);

export const Cell = <RowID, RowAction>(props: {
    data: m.Cell<RowID, RowAction>;
    onAction?: m.OnAction<RowID, RowAction>;
    options: {
        margin?: vt.TopRightBottomLeft;
        padding?: vt.TopRightBottomLeft;
    };
}): React.ReactElement => {
    switch (props.data.type) {
        case 'text': return (<CellText data={props.data} options={props.options}/>);
    }
};
