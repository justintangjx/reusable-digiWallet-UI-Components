import * as muiStyles from '@material-ui/styles';

import { contentAreaTopMargin } from '../../../styles/chrome/index';

// ---

export const useStyles = muiStyles.makeStyles({

    container: {
        flexGrow: 1,
    },

    content: {
        marginTop: contentAreaTopMargin,
        marginBottom: 91,
        marginLeft: 27,
        marginRight: 27,
        fontSize: 24
    },

});
