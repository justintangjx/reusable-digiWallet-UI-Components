import {
    makeStyles,
} from '@material-ui/styles';

export const useStyles = makeStyles({

    card: {
        minWidth: 260,
        maxWidth: 356,
        height: 113,
        margin: 10,
        display: "flex",
        flexDirection: "column"
    },

    headerAndIconWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start"
    },

    headerTitle: {
        marginLeft: 10,
        fontSize: 20
    },

    conversionRate: {
        fontSize: 14,
        marginLeft: 10
    },

    cardAction: {
        paddingTop: 0
    },

    cardContent: {
        paddingBottom: 0
    },

    btn: {
        marginLeft: "auto",
        marginRight: 8,
        marginBottom: 13.48,
        fontSize: 14,
        color: "#1565C0",
        alignSelf: "flex-end",
    },

    listContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },

});
