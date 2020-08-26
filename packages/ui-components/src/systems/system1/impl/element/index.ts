import { Fragment, createElement, ReactElement } from 'react';
import * as m from '../../models';
import * as c from '../common';

import { LinearLayoutSpacer } from '../linearLayoutSpacer/index';
import { LinearLayoutV } from '../linearLayoutV/index';
import { LinearLayoutH } from '../linearLayoutH/index';
import { Text } from '../text/index';
import { Button } from '../button/index';
import { BigButton } from '../bigButton/index';
import { PaperBlock } from '../paperBlock/index';

import { FormInputText } from '../formInputText';
import { FormInputDropdown } from '../formInputDropdown';

import { Table1 } from '../table1/index';
import { Table2 } from '../table2/index';
import { Table3 } from '../table3/index';

import { Rectangle } from '../rectangle/index';
import { ModalPopup } from '../modalPopup/index';
import { ProgressIndicatorModal } from '../progressIndicatorModal/index';


export const Element = (element: m.LayoutElement & { _context?: c.Context }): ReactElement => {
    
    switch (element.type) {

        case 'text': return createElement(Text, element);
        case 'icon': return null as any;

        case 'button': return createElement(Button, element);
        case 'bigButton': return createElement(BigButton, element);
    
        case 'linearLayoutSpacer': return createElement(LinearLayoutSpacer, element);
        case 'linearLayoutH': return createElement(LinearLayoutH, element);
        case 'linearLayoutV': return createElement(LinearLayoutV, element);

        case 'paperBlock': return createElement(PaperBlock, element);
        case 'warningBlock': return null as any;

        case 'formInputText': return createElement(FormInputText, element);
        case 'formInputDropdown': return createElement(FormInputDropdown, element);
        
        case 'table1': 
            if (element.subType === 'data') {
                return createElement(Table1, element);
            } else {
                return createElement(Table1, element);
            }
        case 'table2': return createElement(Table2, { x: element, context: element._context });
        case 'table3': return createElement(Table3, { x: element, context: element._context });

        case 'rectangle':  return createElement(Rectangle, element);

        case 'fromReact': return element.reactElement;

        case 'layoutFragment': return createElement(Fragment, {
            children: element.elements.map((childElementS1, i) => createElement(Element, {
                ...childElementS1,
                key: i,
            })),
        });

        case 'modalPopup': return createElement(ModalPopup, element);
        case 'progressIndicatorModal': return createElement(ProgressIndicatorModal, { x: element, _context: element._context });

        // default: return createElement(Fragment);

    }
};
