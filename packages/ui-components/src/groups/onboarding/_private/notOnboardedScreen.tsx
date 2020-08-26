import * as React from 'react';
import * as muiStyles from '@material-ui/styles';
import { Typography, Paper } from '@material-ui/core';

const supportEmailAddress = 'icbitok@sg.ibm.com';

interface OuterLayoutCSS {
    padding: React.CSSProperties['padding'];
    margin: React.CSSProperties['margin'];
    
}

(x: OuterLayoutCSS): React.CSSProperties => x;

const paddingDefault: Pick<React.CSSProperties, 'padding' | 'paddingLeft' | 'paddingRight' | 'paddingTop' | 'paddingBottom'> = {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 48,
    paddingBottom: 48,
};

const rootStyles = muiStyles.createStyles({
    paperRoot: (props: { outerLayout?: OuterLayoutCSS }): muiStyles.CSSProperties => {
        if (props.outerLayout === undefined) {
            return paddingDefault;
        }
        return {
            ...props.outerLayout,
        };
    },
});
const useRootStyles = muiStyles.makeStyles(rootStyles);

const styles = muiStyles.createStyles({
    headerBlock: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: 20,
    },
    warningBlock: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 6,
        backgroundColor: 'rgba(255,0,0,0.1)',
    },
    warningBlockText: {
        color: 'rgb(255,0,0) !important',
    },
    bodyBlock: {

    },
});
const useStyles = muiStyles.makeStyles(styles);

export const NotOnboardedScreen = (props: { outerLayout?: OuterLayoutCSS }): React.ReactElement => {
    const classes = useStyles();
    const rootClasses = useRootStyles({ outerLayout: props.outerLayout });
    return (<Paper classes={{ root: rootClasses.paperRoot }}>
        <div><Typography classes={{ root: classes.headerBlock }} style={{ fontSize: 20, fontWeight: 500 }}>Persona not assigned yet.</Typography></div>
        <div
            style={{marginTop: 10}}
            className={classes.warningBlock}
        >
            <Typography classes={{ root: classes.warningBlockText}} style={{ fontSize: 16 }}>You need to select a persona to access the features.</Typography>
        </div>
        <div
            style={{marginTop: 10}}
            className={classes.bodyBlock}
        >
            <Typography style={{ fontSize: 16 }}>If you have not selected a persona, please check your email. Look for the onboarding email and select a persona. If you did not receive an onboarding email, your account is still being reviewed. 
            For assistance, you can contact us at <a href={`mailto:${supportEmailAddress}`}>{supportEmailAddress}</a></Typography>
        </div>
        <div
            style={{marginTop: 10}}
            className={classes.bodyBlock}
        >
            <Typography style={{ fontSize: 16 }}>If you have selected a persona, please wait while we process your request.</Typography>
        </div>
    </Paper>)
}