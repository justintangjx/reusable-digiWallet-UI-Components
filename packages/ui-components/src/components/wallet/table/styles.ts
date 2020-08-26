import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles, WithStyles, makeStyles } from "@material-ui/styles";

const WalletTableStyles = (theme: Theme) => 
createStyles({
    iconStyle: {
        position: "relative",
        top: 2,
        width: 40,
        height: 45,
    },
    leftTopToken: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: 400,
        color: "#222222",
        paddingLeft: 16,
        paddingBottom: 5,
        // marginBottom: 5,
    },
    leftBottomAssetQuantity: {
        color: '#9e9e9e',
        fontSize: 16,
        paddingLeft: 16,
    },
    rightTopCurrentBal: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: 400,
        color: "#222222",
        paddingLeft: 16,
        paddingRight: 15,
        paddingBottom: 5,
        // marginBottom: 5,
    },
    rightBottomAvailableBal: {
        color: '#9e9e9e',
        fontSize: 16,
        paddingLeft: 16,
        paddingRight: 15,
    },
    },
);

export const useStyles = makeStyles(WalletTableStyles); 
