import * as muiStyles from '@material-ui/styles';

const styles = muiStyles.createStyles({
    root: {
        '& div': {
            boxSizing: 'border-box',
        },
    },
});

export const useStyles = muiStyles.makeStyles(styles);
export type Classes = muiStyles.WithStyles<typeof styles>;
