import { Theme } from "@material-ui/core/styles/createMuiTheme";
import * as muiStyles from '@material-ui/styles';

// ---

const drawerWidth = 240;

const styles = (theme: Theme) => {
    console.log(theme);
    return {
        drawer: {
            flexShrink: 0,
            width: drawerWidth,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        toolbar: theme.mixins.toolbar,
        nested: {
            paddingLeft: 40,
        },
        root: {
            "&$selected, &$selected:hover, &$selected:focus": {
                backgroundColor: "#bbdefb",
            }
        },
        selected: {
            color: "#304ffe",
        },
        text: {
            fontSize: 14,
        },
    };
};

export type Classes = muiStyles.WithStyles<typeof styles>;

export const useStyles = muiStyles.makeStyles(styles);
