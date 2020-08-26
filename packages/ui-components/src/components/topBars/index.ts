import * as topBarComponent from './TopBar';
import { topBarPropsForAll } from './config';

export type TopBarProps = Pick<topBarComponent.TopBarModel, 'userAvatar' | 'userProfileName'>;

export const TopBar = (props: TopBarProps) => {

    return topBarComponent.TopBar({

        appIconSrc: topBarPropsForAll.appIconSrc,
        appTitle: topBarPropsForAll.appTitle,

        notificationsCount: topBarPropsForAll.notificationsCount,

        userProfileName: props.userProfileName,
        userAvatar: props.userAvatar,

        onNotificationsClick: topBarPropsForAll.onNotificationsClick,
        onProfileClick: topBarPropsForAll.onProfileClick,

    });

};
