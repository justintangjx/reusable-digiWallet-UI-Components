import xIcon from '../../../assets/svgImages/x.svg';
import clockIcon from "../../../assets/svgImages/clock.svg";
import tickIcon from "../../../assets/svgImages/tick.svg";

import * as models from './models';

export const mapIconToSrc: Record<models.Icon, string> = {
    'x': xIcon,
    'clock': clockIcon,
    'tick': tickIcon
};
