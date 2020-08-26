import * as m from './models';



export type Field = {
    label: string;
    value: m.InlineElements;
};
export const field = (label: string, value: m.InlineElements) => ({ label, value });

export interface FieldList {
    options: {
        layoutOptions: m.LayoutOptions,
        fieldToFieldSpacing: number;
        labelWidth: number;
        labelToValueSpacing: number;
        lineHeight?: number;
    };
    fields: readonly Field[];
}

const intersperse = <A, T>(interspersedElement: A, array: readonly T[]): (A | T)[] => {
    const output: (A | T)[] = [];
    array.forEach((item, index) => {
        if (index > 0) {
            output.push(interspersedElement);
        }
        output.push(item);
    });
    return output;
};

export const fieldList = (options: FieldList['options'], fields: readonly Field[]) => {
    return m.linearLayoutV({ ...options.layoutOptions, alignH: 'left' },
        intersperse(
            m.linearLayoutSpacer({ size: options.fieldToFieldSpacing}),
            fields.map(field =>
                m.linearLayoutH({ alignH: 'left', alignV: 'top' }, [
                    m.text(field.label+':', { fontWeight: 500, width: options.labelWidth }),
                    m.linearLayoutSpacer({ size: options.labelToValueSpacing }),
                    ...field.value,
                ])
            ),
        ),
    );
};
