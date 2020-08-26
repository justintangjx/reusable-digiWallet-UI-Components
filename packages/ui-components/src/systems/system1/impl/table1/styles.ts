import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles, WithStyles, makeStyles } from "@material-ui/styles";

import { Color as ModelColor } from '../../models/values';
import * as m from '../../models';
import * as h from '../helpers';

const mapColorRecord: Record<ModelColor, string> = {
    black: '#222222',
    green: 'green',
    red: 'red',
    darkgray: '#555555',
    blue: 'blue',
};
export const mapColor = (modelColor: ModelColor = 'black'): string => mapColorRecord[modelColor];

const styles =
    createStyles<'root' | 'buttonView' | 'buttonLabel' | 'buttonCell' | 'tooltip' | 'iconStyle' | 'tableDataCell' | 'rowOnHover', m.Table1<any, any>['options']>({
        root: {
            width: "100%",
            overflowX: "auto",
            maxWidth: 1400,
        },
        buttonView: {
            color: "#1565C0",
            paddingLeft: 10,
            // marginLeft: -30,
            minWidth: 1,
        },
        buttonLabel: {
            color: 'blue',
            fontSize: 14,
            textAlign: "left"
        },

        buttonCell: {
            paddingLeft: 0,
            fontSize: 14
        },
        iconStyle: {
            position: "relative",
            top: 2,
            width: 14,
            height: 14
        },
        tooltip: {
            fontSize: 12,
            letterSpacing: 0.05,
            fontWeight: 300
        },
        tableDataCell: (props) => ({
            padding: props.cellPadding ? h.formatTopRightBottomLeft(props.cellPadding) : undefined,
        }),
        // ---
        rowOnHover: {
            '&:hover': {
                backgroundColor: 'rgba(21,101,192,0.04) !important'
            }
        },
    });


export type Classes = WithStyles<typeof styles>;
export const useStyles = makeStyles(styles);
