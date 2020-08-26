import * as vt from '../../../../systems/system1/models/values';
import * as s1 from '../../../../systems/system1/models';

// @todo: Migrate this into S1 composites
export const progressIndicatorModalPopupS1C = (x: {
    open?: boolean,
    width?: number | 'content';
    height?: number | 'content';
    padding?: vt.TopRightBottomLeft;
    header?: string;
    body?: string;
}): s1.ModalPopup =>
    s1.modalPopup(typeof x.open !== 'undefined' ? x.open : true,
        {
            width: x.width || 328,
            height: x.height || 240,
            padding: x.padding,
        }, 
        s1.linearLayoutV({ width: 'full', height: 'full' }, [
            // @todo: Add spinner to System-1 then add it here
            s1.linearLayoutSpacer({ size: 8 }),
            x.header ?
                s1.text(x.header, { fontWeight: 600, fontSize: 24 }) :
                null,
            s1.linearLayoutSpacer({ size: 5 }),
            x.body ?
                s1.text(x.body, { fontWeight: 400, fontSize: 16 }) :
                null,
        ]),
    );
