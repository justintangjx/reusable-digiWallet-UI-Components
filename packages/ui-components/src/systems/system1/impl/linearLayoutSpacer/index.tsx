import * as React from 'react';
import * as m from '../../models';

export const LinearLayoutSpacer = (props: m.LinearLayoutSpacer) =>
    (<div style={{
        flexBasis: props.options.size,
        flexGrow: props.options.grow || 0,
        flexShrink: 0,
    }}>
    </div>);
