import * as React from 'react';

import {
    Tooltip,
    Typography,
} from "@material-ui/core";

import {
    FieldValueTextProps,
    FieldValueIconAndTextProps,
    FieldValueProps,
    FieldsProps,
} from '../../models';

import {
    mapIconToSvgComponent,
} from '../icons';



// @todo: To map color from color type to theme/design color

const FieldValueText = (props: FieldValueTextProps) =>
    (<div style={{
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 0,
        lineHeight: props.lineHeight,
    }}><Typography style={{color: props.color}}>{props.text}</Typography></div>);

const FieldValueIconAndText = (props: FieldValueIconAndTextProps) => {
    const IconComponent = mapIconToSvgComponent[props.icon];
    return (<div style={{
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 0,
        display: 'flex',
        lineHeight: props.lineHeight,
    }}>
        {props.tooltip ?
            (<Tooltip title={props.tooltip}>
                <IconComponent color={props.color} />
             </Tooltip>) :
             (<IconComponent color={props.color} />)
        }
        {/* <div style={{ flexBasis: 6 }} /> */}
        <Typography style={{color: props.color}}>{props.text}</Typography>
    </div>);
};

const FieldValue = (props: FieldValueProps): React.ReactElement => {
    switch (props.type) {
        case 'text': return (<FieldValueText {...props} />);
        case 'iconAndText': return (<FieldValueIconAndText {...props} />);
    }
};

export const Fields = (props: FieldsProps) => {
    return (<div style={{ display: 'flex', flexDirection: 'column' }}>
        {props.fields.map((fieldProps, index) =>
            (<div
                key={index}
                style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 22,
                    marginTop: index === 0 ? 0 : props.fieldToFieldSpacing,
                    display: 'flex',
                }}
            >

                <div style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: props.labelWidth,
                    marginRight: props.labelToValueSpacing,
                }}>
                    <Typography style={{ fontWeight: 500 }}>{fieldProps.label}</Typography>
                </div>

                <FieldValue {...fieldProps.value} />

            </div>)
        )}
    </div>);
};
