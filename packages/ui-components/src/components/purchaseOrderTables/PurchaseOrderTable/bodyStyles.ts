import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles, WithStyles, makeStyles } from "@material-ui/styles";

// @todo: This should go into './styles.ts'.
const styles = (theme: Theme) =>
    createStyles({
        iconContainer: {
            display: "flex",
            justifyContent: "center",
            marginTop: 60,
            marginBottom: 22,
        },
        spinnerIcon: {
            color: "#1565C0",
        },
        emptyOrdersIcon: {
            height: 90,
            width: 80,
        },
        tableRowHover: {
            '&:hover': {
                backgroundColor: 'rgba(21,101,192,0.04) !important'
            }
        },
        title: {
            display: "flex",
            justifyContent: "center",
            fontWeight: 450,
            marginBottom: 8,
        },
        subTitle: {
            display: "flex",
            justifyContent: "center",
            marginBottom: 62,
            color: "rgba(0, 0, 0, 0.38)",
            fontSize: theme.spacing.unit * 2,
        }
    });

export type Classes = WithStyles<typeof styles>;
export const useStyles = makeStyles(styles);
