import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles, WithStyles, makeStyles } from "@material-ui/styles";

import { Color as ModelColor } from './models';

const mapColorRecord: Record<ModelColor, string> = {
    black: '#222222',
    green: 'green',
    red: 'red',
};
export const mapColor = (modelColor: ModelColor = 'black'): string => mapColorRecord[modelColor];

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            overflowX: "auto",
            maxWidth: 1400,
        },
        buttonView: {
            color: "#1565C0",
            textTransform: "none",
            paddingLeft: 10,
            minWidth: 30
        },
        buttonLabel: {
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
        searchIcon: {
            marginTop: theme.spacing.unit
        },
        questionIcon: {
            padding: 3,
            marginRight: 9
        },
        topBarRoot: {
            paddingRight: theme.spacing.unit,
            paddingLeft: theme.spacing.unit * 4.5
        },
        topBarSpacer: {
            flex: "1 1 100%"
        },
        topBarLeft: {
            display: "flex",
            marginTop: theme.spacing.unit * 2,
            alignItems: "center"
        },
        tableTitle: {
            flex: "0 0 auto"
        },
        tableOrderStatusDescription: {
            cursor: "pointer",
            color: "#1565C0"
        },
        table: {
            minWidth: 500,
        },
        tooltip: {
            fontSize: 12,
            letterSpacing: 0.05,
            fontWeight: 300
        },
        bottomSpacer: {
            height: theme.spacing.unit * 5
        },
        toolTipSpacing: {
            margin: theme.spacing.unit * 2
        },
        // ---
        rowOnHover: {
            '&:hover': {
                backgroundColor: 'rgba(21,101,192,0.04) !important'
            }
        },
    });


export type Classes = WithStyles<typeof styles>;
export const useStyles = makeStyles(styles);
