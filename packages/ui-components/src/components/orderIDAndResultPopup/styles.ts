import { makeStyles } from "@material-ui/styles";

// @todo: To get font-size from Dora
const titleFontSize = 24;
const bodyFontSize = 14;

const titleAndOrderIDSpacing = 8;

export const useStyles = makeStyles({
    container: {
        width: 326
    },
    failureTitle: {
        color: "#e53935",
        fontSize: titleFontSize,
        letterSpacing: 0.09
    },
    successTitle: {
        color: "#00c853",
        fontSize: titleFontSize,
        letterSpacing: 0.09
    },
    successFailureBodyText: {
        color: "#222222",
        fontSize: bodyFontSize,
        letterSpacing: 0.05
    },
    orderId: {
        marginTop: titleAndOrderIDSpacing,
        fontSize: titleFontSize,
        letterSpacing: 0.09
    },
});
