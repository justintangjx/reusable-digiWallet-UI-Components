import {
    makeStyles,
    createStyles,
    WithStyles,
} from '@material-ui/styles';

// ---

// @todo: To remove most of these, and apply the remaining styles to the elements.

const styles = createStyles({
    dialogContainer: {
        width: 330,
        height: 470
    },
    dialogTitle: {
        fontSize: 20
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        paddingLeft: 18
    },
    subHeaderContainer: {
        paddingBottom: 10
    },
    subHeader: {
        color: "#222222"
    },
    formTextField: {
        marginLeft: 6,
        marginRight: 6,
        width: 282,
        height: 56
    },
    dropDownMenu: {
        width: 150
    },
    bottomFormButtons: {
        marginTop: 30,
        marginBottom: 24,
        marginRight: 8
    },
    containedPrimarycolor: {
        backgroundColor: "#1565C0",
        width: 113,
        "&:hover": {
            backgroundColor: "#1565C0"
        }
    },
    bottomCancelButton: {
        color: "#1565C0",
        width: 113
    },
    tooltip: {
        fontSize: 12,
        letterSpacing: 0.05,
        fontWeight: 400
    }
});

export type Classes = WithStyles<typeof styles>;
export const useStyles = makeStyles(styles);

