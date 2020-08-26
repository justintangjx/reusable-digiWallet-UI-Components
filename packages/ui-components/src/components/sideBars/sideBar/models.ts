export interface Selectable<SelectableItemID> {
    onSelect: (itemID: SelectableItemID) => void;
}

export interface Expandable<ExpandableItemID> {
    onExpand: (itemID: ExpandableItemID, direction: 'open' | 'close') => void;
}

export interface SideBarItem2<ID2> {
    id: ID2;
    // ---
    label: string;
    // ---
    isDisabled: boolean;
    isSelected: boolean;
};

// ---

export interface SideBarItem1<ID1, ID2> {
    id: ID1;
    // ---
    label: string;
    activeIconSrc?: string;
    inactiveIconSrc?: string;
    // ---
    isDisabled: boolean;
    isExpandable: boolean;
    isExpanded: boolean;
    isSelectable: boolean;
    isSelected: boolean;
    // ---
    children: readonly SideBarItem2<ID2>[];
}

// ---

export interface SideBar<ID1, ID2> {
    items: readonly SideBarItem1<ID1, ID2>[];
    onExpand: (itemID: ID1, direction: 'open' | 'close') => void;
    onSelect: (itemID: ID1 | ID2) => void;
}
