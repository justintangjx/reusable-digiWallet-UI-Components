export interface HomeContentContainerModel {

    table1: {
        topHeader: string;
        topSubHeader?: string;
        topComponent: React.ReactNode;
    };

    table2?: {
        header: string;
        subHeader?: string;
        table?: React.ReactNode;
    };

}

export type Icon = 'rightArrow';

export interface HeaderTextProps { text: string; }

export interface HeaderButtonProps {
    icon: Icon;
    color: string;
    label: string;
    onClick: () => void;
}

export interface HeaderProps {
    headerText: HeaderTextProps;
    headerButton?: HeaderButtonProps;
}
