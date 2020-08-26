import { Theme } from "@material-ui/core/styles/createMuiTheme";
import * as muiStyles from '@material-ui/styles';

export const useStyles = muiStyles.makeStyles((theme: Theme) => ({

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        colorDefault: "#fafafa"
    },

    toolbar: theme.mixins.toolbar,

    title: {
        marginLeft: 16,
        display: "flex",
        flexDirection: "row"
    },

    projectText: {
        fontWeight: 300
    },

    projectNameText: {
        fontWeight: 500
    },

    topRightMenu: {
        marginLeft: "auto",
        marginRight: 20
    },

    letterAvatar: {
        color: "#fff",
        backgroundColor: "#304ffe",
        cursor: "pointer",
    }

}));
