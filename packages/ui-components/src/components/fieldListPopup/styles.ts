import * as muiStyles from '@material-ui/styles';

export const useStyles = muiStyles.makeStyles({
    orderDetailsModal: {
        width: 371
    },
    cellBlackTextStyle: {
        border: 0,
        padding: 0,
        fontSize: 13,
        color: "#222222"
    },
    cellRedTextStyle: {
        border: 0,
        padding: 0,
        fontSize: 13,
        color: "#FF0000"
    },
    cellCategoryStyle: {
        width: 138,
        border: 0,
        padding: 0,
        fontSize: 14,
        fontWeight: 500
    },
    cellHeaderStyle: {
        border: 0,
        fontSize: 20,
        fontWeight: 500,
        color: "#222222",
        paddingTop: 0,
        paddingRight: 0,
        paddingLeft: 0,
        paddingBottom: 6
    },
    tableRowStyle: {
        height: 25
    },
    tooltip: {
        fontSize: 12,
        letterSpacing: 0.05,
        fontWeight: 400
    },
    iconStyle: {
        position: "relative",
        top: 2,
        width: 14,
        height: 14
    }
});
