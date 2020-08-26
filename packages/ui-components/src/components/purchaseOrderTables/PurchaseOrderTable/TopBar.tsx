import React from "react";
import {
    Toolbar,
    Typography,
    Tooltip,
    IconButton,
    Link,
} from "@material-ui/core";

// ---

import * as models from './models';
import { Classes } from './styles';
import {
    tableToolTipIcon,
    searchIcon,
} from './svgs';

// ---

export const TopBar = (
    props: models.TopBarProps & Classes,
): React.ReactElement => {

    return (

        <Toolbar className={props.classes.topBarRoot}>

            <div className={props.classes.topBarLeft}>

                <Typography
                    variant="h6"
                    id="tableTitle"
                    className={props.classes.tableTitle}
                >
                    {props.tableTitle}
                </Typography>

                {props.toolTipMsg &&
                    <Tooltip
                        title={props.toolTipMsg}
                        classes={{ tooltip: props.classes.tooltip }}
                    >
                        <IconButton className={props.classes.questionIcon}>
                            <img src={tableToolTipIcon} alt={'Loading...'} />
                        </IconButton>
                    </Tooltip>
                }

                {
                    // @todo: Add tooltip text for order status info
                }
                {props.onOrderStatusInfoPopup &&
                    <Typography
                        variant="body1"
                        id="orderStatusDescription"
                        className={props.classes.tableTitle}
                    >
                        What does{" "}
                        <Link
                            variant="body1"
                            className={props.classes.tableOrderStatusDescription}
                            onClick={props.onOrderStatusInfoPopup}
                        >
                            {" "}
                            order status{" "}
                        </Link>{" "}
                        mean?
                    </Typography>
                }

            </div>

            {props.onSearch &&
                <>
                    <div className={props.classes.topBarSpacer} />
                    <IconButton
                        aria-label="Search"
                        onClick={props.onSearch}
                        className={props.classes.searchIcon}
                    >
                        <img src={searchIcon} alt = 'loading...' />
                    </IconButton>
                </>
            }

        </Toolbar>

    );

};
