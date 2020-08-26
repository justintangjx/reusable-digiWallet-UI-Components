import * as models from '@local/f-model/dist/purchaseOrder';

// ---

export type Color = 'black' | 'red';
export type Icon = 'x' | 'clock' | 'tick';
export type OrderStatus = models.OrderStatus;
export type ApptStatus = models.AppointmentStatus;
export type PurchaseOrder = models.PurchaseOrder;

export interface TextField {
    type: 'text';
    label: string;
    text: string;
    color: Color;
}

export interface IconAndTextField {
    type: 'iconAndText';
    label: string;
    icon: Icon;
    tooltip?: string;
    text: string;
    color: Color;
}

export type Field = TextField | IconAndTextField;

// @todo: Should this follow the DialogButton interface? I.e. model dependency?
interface Button<ID> {
    id: ID;
    type: 'primary' | 'secondary';
    label: string;
    onClick: (id: ID) => void;
}

export interface FieldListPopup<ButtonID> {
    readonly isOpen: boolean;
    readonly title: string;
    readonly fields: readonly Field[];
    readonly buttons: readonly Button<ButtonID>[];
}
