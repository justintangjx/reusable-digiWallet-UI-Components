import {
    createStyles,
    makeStyles,
    WithStyles,
} from '@material-ui/styles';

const styles = createStyles({
    colorRed: { color: 'red', },
    colorBlack: { color: 'black', },
    colorGreen: { color: 'black', },
    text: {},
    headerText: {
        fontWeight: 500,
        fontSize: 20,
    },
    emphasisText: {
        fontWeight: 500,
    },
});

export type Classes = WithStyles<typeof styles>
export const useStyles = makeStyles(styles);