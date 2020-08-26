import { TopBarModel } from './TopBar';

import merlionIcon from '../../../assets/svgImages/project-merlion.svg';

export const topBarPropsForAll: Omit<TopBarModel, 'userProfileName' | 'userAvatar'> = {

    appIconSrc: merlionIcon,
    appTitle: "MERLION",

    notificationsCount: 0,

    onNotificationsClick: () => { console.log('TopBar notifications not implemented'); },
    onProfileClick: () => { console.log('TopBar profile click not implemented'); },

};
