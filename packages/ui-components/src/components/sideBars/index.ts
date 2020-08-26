import * as React from 'react';

import {
    SideBar as SideBarComponent,
    SideBarProps as SideBarComponentProps,
} from './sideBar/index';

import {
    SideBarItem1 as PresentationItem1,
    SideBarItem2 as PresentationItem2,
} from './sideBar/models';

import {
    MenuItemID as ID,
    MenuItemID1 as ID1,
    MenuItemID2 as ID2,
} from '@local/f-model/dist/sideBar';
import * as m from '@local/f-model/dist/sideBar';

import * as userRoleModel from '@local/f-model/dist/v3/groups/userRole/index';

import * as config from './config';

// ---

export type Icons = Record<ID1, { active: string; inactive: string; }>;

// ---

const isUserRolesInRolePartSet = (
    left: readonly userRoleModel.UserRole[],
    right: readonly userRoleModel.RolePartRole[],
): boolean => {
    // Sort merge would be faster
    for (const lefti of left) {
        for (const righti of right) {
            if (lefti.chaincode === 'asset' &&
                righti.chaincode === 'asset' &&
                lefti.assetRole === righti.assetRole
            ) {
                return true;
            }
            if (lefti.chaincode === 'token' &&
                righti.chaincode === 'token' &&
                lefti.tokenRole === righti.tokenRole
            ) {
                return true;
            }
        }
    }
    return false;
};

const mapItem2ModelToPresentation = (
    userRoles: readonly userRoleModel.UserRole[],
    item2: m.Item2,
    selected: ID | null,
): PresentationItem2<ID2> => {
    let isDisabled: boolean = typeof item2.disabled !== 'undefined' && item2.disabled;
    if (!isDisabled && typeof item2.onlyForRoles !== 'undefined') {
        isDisabled = !isUserRolesInRolePartSet(userRoles, item2.onlyForRoles);
    }
    return ({
        id: item2.id,
        label: config.labels[item2.id],
        isDisabled,
        isSelected: selected === item2.id ? true : false && item2.id === selected,
    });
};


const mapItem1ModelToPresentation = (
    userRoles: readonly userRoleModel.UserRole[],
    icons: Icons,
    item1: m.Item1,
    selected: ID | null,
    expanded: Partial<Record<ID1, boolean>>,
): PresentationItem1<ID1, ID2> => {
    let isDisabled: boolean = typeof item1.disabled !== 'undefined' && item1.disabled;
    if (!isDisabled && typeof item1.onlyForRoles !== 'undefined') {
        isDisabled = !isUserRolesInRolePartSet(userRoles, item1.onlyForRoles);
    }
    return {
        id: item1.id,
        label: config.labels[item1.id],
        // ---
        inactiveIconSrc: icons[item1.id].inactive,
        activeIconSrc: icons[item1.id].active,
        // ---
        isDisabled,
        isSelectable: item1.isSelectable ? true : false,
        isSelected: item1.id === selected ? true : false,
        isExpandable: item1.children !== undefined,
        isExpanded: expanded[item1.id] ? true : false,
        // ---
        children: item1.children !== undefined ?
            item1.children.map(item2 => mapItem2ModelToPresentation(userRoles, item2, selected)) :
            [],
    };
};

// ---

type SideBarProps =
    Omit<SideBarComponentProps<ID1, ID2>, 'items'> &
    {
        readonly icons: Icons;
        readonly selected: ID | null;
        readonly expanded: Partial<Record<ID1, boolean>>;
        userRoles: readonly userRoleModel.UserRole[];
    };

export const SideBar =
    (props: SideBarProps): React.ReactElement => {
        return SideBarComponent({
            items: m.everything.map(item1 => mapItem1ModelToPresentation(props.userRoles, props.icons, item1, props.selected, props.expanded)),
            onSelect: props.onSelect,
            onExpand: props.onExpand,
        });
    };
