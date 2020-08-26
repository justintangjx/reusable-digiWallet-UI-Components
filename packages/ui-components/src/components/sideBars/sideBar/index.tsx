import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Collapse,
    ListItemIcon,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

// ---

import * as styles from './styles';

import * as models from './models';

// ---

const SideBarItem2 = <ID2 extends any>(
    props: models.SideBarItem2<ID2> & models.Selectable<ID2> & styles.Classes,
): React.ReactElement => {
    return (
        <ListItem
            button={true}
            className={props.classes.nested}
            disabled={props.isDisabled}
            selected={props.isSelected}
            onClick={() => { props.onSelect(props.id); }}
            classes={{
                root: props.classes.root,
                selected: props.classes.selected
            }}
        >
            <ListItemText
                primary={props.label}
                classes={{ primary: props.classes.text }}
            />
        </ListItem>
    );
};

// ---

const SideBarItem1 = <ID1 extends any, ID2 extends any>(
    props: models.SideBarItem1<ID1, ID2> & models.Expandable<ID1> & models.Selectable<ID1 | ID2> & styles.Classes,
): React.ReactElement => {

    return (<>

        <ListItem
            classes={{
                root: props.classes.root,
                selected: props.classes.selected
            }}
            button={true}
            disabled={props.isDisabled}
            selected={props.isSelectable && props.isSelected}
            onClick={() => {
                if (props.isExpandable) {
                    props.onExpand(props.id, props.isExpanded ? 'close' : 'open');
                }
                if (props.isSelectable) {
                    props.onSelect(props.id);
                }
            }}
        >
            <ListItemIcon>
                <img src={props.isSelectable && props.isSelected ? props.activeIconSrc : props.inactiveIconSrc} alt={"Loading..."} />
            </ListItemIcon>
            <ListItemText
                primary={props.label}
                classes={{ primary: props.classes.text }}
            />
            {
                props.isExpandable ?
                    props.isExpanded ? 
                        (<ExpandLess/>) :
                        (<ExpandMore/>) :
                    null
            }
        </ListItem>

        {/* Children, side-bar item-2 */}
        {
            props.isExpandable && props.children.length > 0 ?
                (<Collapse
                        in={props.isExpandable && props.isExpanded}
                        timeout='auto'
                >
                    <List>
                        {
                            // @todo: To add empty space/padding for empty state? Or not?
                            props.children.length === 0 ?
                                null :
                                props.children.map((item2, index2) => (
                                    <SideBarItem2
                                        {...item2}
                                        onSelect={props.onSelect}
                                        key={index2}
                                        classes={props.classes}
                                    />
                                ))
                        }
                    </List>
                </Collapse>) :
                null
        }

    </>);

};

// ---

export type SideBarProps<ID1 extends any, ID2 extends any> = models.SideBar<ID1, ID2>;
export const SideBar = <ID1 extends any, ID2 extends any>(
    props: SideBarProps<ID1, ID2>,
): React.ReactElement => {
    const classes = styles.useStyles();
    return (
        <Drawer
            className={classes.drawer}
            variant='permanent'
            classes={{
                paper: classes.drawerPaper
            }}
        >

            <div className={classes.toolbar} />

            <List>
                {props.items.map((item1, index1) => {
                    return (
                        <SideBarItem1
                            key={index1}
                            {...item1}
                            onSelect={props.onSelect}
                            onExpand={props.onExpand}
                            classes={classes}
                        />
                    );
                })}
            </List>
        </Drawer>
    );
};
