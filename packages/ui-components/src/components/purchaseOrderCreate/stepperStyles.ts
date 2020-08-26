import { makeStyles } from "@material-ui/styles";

// @todo: To get font-size from Dora
const titleFontSize = 24;

export const useStyles = makeStyles({
    orderId: {
        fontSize: titleFontSize,
        letterSpacing: 0.09
    },
    container: {
        width: 397
    },
    stepperTitle: {
        color: "#43a047"
    },
    dialogActions: {
        height: 50
    },
    dialogTitle: {
        fontSize: titleFontSize,
        paddingBottom: 17
    },
    dialogContent: {
        paddingBottom: 0
    },
    stepperStyle: {
        paddingTop: 15,
        paddingLeft: 3,
        paddingBottom: 0
    },
    stepLabel: {
        fontWeight: 500,
        color: "rgba(0, 0, 0, 0.87)"
    },
    stepIcon: {
        "&$active": {
            color: "#27AE60"
        },
        width: 10,
        height: 10
    },
    labelIcon: {
        position: "relative",
        top: 2,
        marginRight: 3
    },
    stepContent: {
        marginLeft: 4,
        marginTop: 0,
        paddingLeft: 14
    },
    connectorRoot: {
        marginLeft: 4,
        padding: 0,
        height: 15
    },
    connectorLine: {
        height: 15,
        minHeight: 15
    },
    active: {},
    bodyText: {
        color: "#222222"
    }
});
