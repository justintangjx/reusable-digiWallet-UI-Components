import * as React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Avatar,
    Badge,
    Typography,
} from "@material-ui/core";

import { NotificationImportant } from "@material-ui/icons";

import { useStyles } from './styles';

export interface TopBarModel {

    appIconSrc: string;
    appTitle: string;

    userAvatar:
        { type: 'image', src: string; } |
        { type: 'initials', initials: string };

    userProfileName: string;

    notificationsCount: number;

    onNotificationsClick: () => void;
    onProfileClick: () => void;
}

export const TopBar = (
    props: TopBarModel,
): React.ReactElement => {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar} color="default">
            <Toolbar>
                <img src={props.appIconSrc} alt={'Loading...'} />
                <div className={classes.title}>
                    <Typography
                        variant="h5"
                        color="inherit"
                        noWrap
                        className={classes.projectText}
                    >
                        {"Project"}{'\u00A0'}
                    </Typography>
                    <Typography
                        variant="h5"
                        color="inherit"
                        noWrap
                        className={classes.projectNameText}
                    >
                        {props.appTitle}
                    </Typography>

                </div>

                <IconButton
                    className={classes.topRightMenu}
                    aria-label="Notifications"
                    color="inherit"
                    onClick={props.onNotificationsClick}
                >
                    <Badge
                        badgeContent={props.notificationsCount}
                        color="secondary"
                    >
                        <NotificationImportant />
                    </Badge>
                </IconButton>

                {
                    props.userAvatar.type === 'image' ?
                        // @todo: Do we need to style the image avatar differently?
                        <Avatar
                            className={classes.letterAvatar}
                            onClick={props.onProfileClick}
                            src={props.userAvatar.src}
                            alt={props.userProfileName}
                        /> :
                        <Avatar
                            className={classes.letterAvatar}
                            onClick={props.onProfileClick}
                        >
                            {props.userAvatar.initials}
                        </Avatar>
                }

            </Toolbar>

        </AppBar>

    );
};
