This is a sample of how it is used. Copy it into a `.tsx` file to try.

```ts
import * as React from 'react';

import * as m from './models';

interface TokenBalanceCardProps {
    iconID: m.IconID;
    tokenLabel: string;
    tokenUnit: string;
    tokenBalance: number; 
    tokenAvailableBalance: number;
    assetAmount: number;
    assetUnit: string;
}

const TokenBalanceCard = (props: TokenBalanceCardProps) =>

    m.linearH({ padding: [6, 8], width: 500 }, [

        m.linearV({ alignV: 'center' }, [m.icon('clock', { width: 36, height: 36 })]),

        m.spacer({ size: 8 }),

        m.linearV({ alignV: 'center' }, [
            m.text(`${props.tokenLabel} (${props.tokenUnit})`, { fontSize: 20, fontWeight: 600 }),
            m.spacer({ size: 4 }),
            m.text(`Asset: ${props.assetAmount} ${props.assetUnit}`, { fontSize: 16, color: 'darkgray' }),
        ]),

        m.spacer({ grow: 1 }),

        m.linearV({ alignV: 'center' }, [
            m.text(`${props.tokenBalance} (${props.tokenUnit})`, { fontSize: 20, fontWeight: 600 }),
            m.spacer({ size: 4 }),
            m.text(`Available: ${props.tokenAvailableBalance}`, { fontSize: 16, color: 'darkgray' }),
        ]),

    ]);
```