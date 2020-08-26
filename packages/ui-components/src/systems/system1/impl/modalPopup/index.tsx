import * as React from 'react';

import { createStyles, WithStyles, makeStyles } from "@material-ui/styles";
import { Dialog } from '@material-ui/core';

import * as m from '../../models';
import * as h from '../helpers';

import { Element } from '../element/index';

const styles = createStyles<'paper', m.ModalPopup>({
    paper: (props) => ({
        margin: props.options.margin ? h.formatTopRightBottomLeft(props.options.margin) : undefined,
        padding: props.options.padding ? h.formatTopRightBottomLeft(props.options.padding) : undefined,
        width: props.options.width !== 'content' ? props.options.width : undefined ,
        height: props.options.height !== 'content' ? props.options.height : undefined ,
        display: 'flex',
    }),
});
const useStyles = makeStyles(styles);

export const ModalPopup = (props: m.ModalPopup) => {
    const classes = useStyles(props);
    // @todo: To do the width and height properly
    return (<Dialog
        open={props.open}
        style={{
        }}
        classes={{
            paper: classes.paper,
        }}
    >
        <Element {...props.layout} _context={{ parentLayoutType: 'flexRowOneChild' }} />
    </Dialog>);
};