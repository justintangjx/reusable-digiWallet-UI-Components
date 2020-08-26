import { Result, resultC } from '@local/result';

import { AssetAndTokenConfig, assetAndTokenConfigGetItemByTokenTypeName } from '@local/f-model/dist/groups/config/model';
import { ReadonlyTransferOrder } from '@local/f-model/dist/groups/tokenTransfer/model';
import { ITs } from '@local/f-model/dist/groups/tokenTransfer/workflows/popup';
import { State as IState } from '@local/f-workflows/dist/popup/index';

import * as m from '../../systems/system1/models';
import * as c from '../../systems/system1/composite';

import { ModalPopup } from '../../systems/system1/impl/modalPopup/index';

export type TokenTransferOrderDetailsPopupProps = {
    state: IState<ITs['orderDetails']['params']>;
    onClose: () => void;
    onCancel: () => void;
};

const tokenTransferOrderDetailsPopupSystem1 = (props: TokenTransferOrderDetailsPopupProps) => {

    if (props.state.type === 'close') {
        return m.modalPopup(false, { width: 376, height: 400 },
            m.linearLayoutV({}, []),
        );
    }

    const order = props.state.params.order;
    
    const tokenTypeLabel =
        props.state.params.assetAndTokenConfig.isOk ?
            resultC(assetAndTokenConfigGetItemByTokenTypeName(props.state.params.assetAndTokenConfig.ok, order.tokenTypeName))
                .map(x => x.tokenTypeLabel)
                .unwrapOr(order.tokenTypeName) :
            order.tokenTypeName;

    const tokenTypeUnit =
        props.state.params.assetAndTokenConfig.isOk ?
            resultC(assetAndTokenConfigGetItemByTokenTypeName(props.state.params.assetAndTokenConfig.ok, order.tokenTypeName))
                .map(x => x.tokenTypeUnit)
                .unwrapOr(order.tokenTypeName) :
            order.tokenTypeName;
    
    return m.modalPopup(true, { width: 376, height: 'content', padding: 40 },
        m.linearLayoutV({ width: 'content', height: 'content', alignH: 'left', alignV: 'top' }, [
            m.text('Transfer details', { fontWeight: 500, fontSize: 20 }),
            m.linearLayoutSpacer({ size: 12 }),
            c.fieldList({ fieldToFieldSpacing: 10, labelToValueSpacing: 12, layoutOptions: { width: 'full' }, labelWidth: 120 }, [
                c.field('Transaction ID', [m.text(order.transactionID)]),
                c.field('Status', [m.text(order.status)]), // @todo: To format status 
                // @todo: Created on, accepted/rejected/cancelled on, are not avaiable in the data model. To add the display when data is available in the data model.
                c.field('Recipient', [m.text(order.toAccountID)]), // @todo: This is currently the to-account-ID. Not sure if it should be the to-user-ID instead.
                c.field('Token', [m.text(tokenTypeLabel)]),
                c.field('Amount', [m.text(order.amount.toString() + ' ' + tokenTypeUnit)]), // @todo: To format amount.
                // @todo: To add unit
            ]),
            m.linearLayoutSpacer({ size: 32 }),
            m.linearLayoutH({ width: 'full' }, [
                m.linearLayoutSpacer({ grow: 1 }),
                ...(props.state.params.isCancellable ?
                    [
                        m.button('CANCEL TRANSFER', props.onCancel),
                        m.linearLayoutSpacer({ size: 12 }),
                    ] :
                    []),
                m.button('CLOSE', props.onClose),
            ]),
        ]),
    );

};

export const TokenTransferOrderDetailsPopup =
    (props: TokenTransferOrderDetailsPopupProps) =>
        ModalPopup(tokenTransferOrderDetailsPopupSystem1(props));
