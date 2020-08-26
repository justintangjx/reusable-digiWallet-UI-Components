import * as s1 from '../../../../systems/system1/models';
import * as progressIndicator from '../helpers/progressIndicator';

// ---

export interface Props {
    type: 'close' | 'open';
}

// ---


export const s1c = (props: Props): s1.ModalPopup =>
    props.type === 'open' ?
        progressIndicator.progressIndicatorModalPopupS1C({ 
            open: true,
            header: 'Processing',
            body: 'Please wait...',
        }) :
        progressIndicator.progressIndicatorModalPopupS1C({
            open: false,
            header: 'Processing',
            body: 'Please wait...',
        });
