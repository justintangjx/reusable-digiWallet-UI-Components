import {
    makeStyles,
    createStyles,
    WithStyles,
} from '@material-ui/styles';

// ---

const styles = createStyles({
    formTextField: {
        marginLeft: 6,
        marginRight: 6,
        // width: 282,
        height: 56
    },
    dropDownMenu: {
        // width: 150
    },
});

export type Classes = WithStyles<typeof styles>;
export const useStyles = makeStyles(styles);

