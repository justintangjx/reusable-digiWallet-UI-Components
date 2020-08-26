import React from 'react';

import * as m from '../../../systems/system1/models';



export interface DashboardContentFrameProps {
    leftAccountID: string;
    topRightText: string;
    leftDoughnutChart: React.ReactElement;
    leftDoughnutLegend: React.ReactElement;
    rightTokensList: m.LayoutElement;
}

export const DashboardContentFrame = (props: DashboardContentFrameProps): m.LayoutElement => m.paperBlock({ width: 1111, height: 400 }, 
    m.linearLayoutV({}, [

        m.linearLayoutH({ width: 'full', height: 72, alignH: 'left' }, [

            m.linearLayoutH({ width: 0, grow: 1, alignH: 'left' }, [
                m.text(`Account ID: ${props.leftAccountID}`, { margin: [0, 0, 0, 20], fontSize: 20, fontWeight: 500 }),
            ]),

            m.linearLayoutSpacer({ size: 1.5 }), // Divider

            m.linearLayoutH({ width: 0, grow:1, alignH: 'left', padding: [0, 0, 0, 0] }, [
                m.text(props.topRightText, { margin: [0,24], fontSize: 20, fontWeight: 500 }),
            ]),
        ]),

        m.rectangle('full', 1.5, '#D8D8D8'),

        m.linearLayoutH({ width: 'full', grow: 1 }, [

            m.linearLayoutH({ width: 0, grow: 1, height: 328, alignV: 'top', alignH: 'left' }, [
                m.linearLayoutSpacer({size: 30}),

                m.linearLayoutV( {}, [
                    m.linearLayoutSpacer({ size: 35 }),
                    m.fromReact(props.leftDoughnutChart),
                ]),
                    m.fromReact(props.leftDoughnutLegend),
                ]),

            m.rectangle(1.5, 'full', '#D8D8D8'),

            m.linearLayoutV({ width: 0, grow: 1, height: 328, alignV: 'top', alignH: 'left' }, [
                    props.rightTokensList,
            ]),
        ]),
    ])); 