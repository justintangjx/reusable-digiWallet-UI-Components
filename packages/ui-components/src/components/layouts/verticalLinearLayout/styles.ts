import * as muiStyles from '@material-ui/styles';

// ---

export const useStyles = muiStyles.makeStyles(
    {
        bodyText: {
            fontSize: 16,
        },
        headerText: {
            fontSize: 24
        },
        header: {
            alignItems: 'center',
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },
        primaryBtn: {
            borderRadius: 2,
            height: 40,
            paddingBottom: 12,
            paddingTop: 12,
            width: 208,
        },
        label: {
            fontSize: 14,
            height: 16,
            letterSpacing: 1.25,
            lineHeight: 16,
        },
        topSubHeader: {
            fontSize: 16,
            padding: 10
        },
    }
);
