import * as React from 'react';

import SvgIcon from '@material-ui/core/SvgIcon';

import {
    Icon,
} from './models';

// @todo: To refactor
export const mapIconToSvgComp: Record<Icon, React.FunctionComponent<{ color?: string }>> = {
    clock: (props) =>
        (<SvgIcon style={{ marginTop: 0.5, width: '0.7em', marginRight: -3 }}>
            <g fill={props.color} fillRule='nonzero'>
                <path d="M8,0 C9.44086742,0 10.7741874,0.360211452 12,1.08064516 C13.2258126,1.80107887 14.1989211,2.77418742 14.9193548,4 C15.6397885,5.22581258 16,6.55913258 16,8 C16,9.44086742 15.6397885,10.7741874 14.9193548,12 C14.1989211,13.2258126 13.2258126,14.1989211 12,14.9193548 C10.7741874,15.6397885 9.44086742,16 8,16 C6.55913258,16 5.22581258,15.6397885 4,14.9193548 C2.77418742,14.1989211 1.80107887,13.2258126 1.08064516,12 C0.360211452,10.7741874 0,9.44086742 0,8 C0,6.55913258 0.360211452,5.22581258 1.08064516,4 C1.80107887,2.77418742 2.77418742,1.80107887 4,1.08064516 C5.22581258,0.360211452 6.55913258,0 8,0 Z M8,14.4516129 C9.16129613,14.4516129 10.2365542,14.1612932 11.2258065,13.5806452 C12.2150587,12.9999971 12.9999971,12.2150587 13.5806452,11.2258065 C14.1612932,10.2365542 14.4516129,9.16129613 14.4516129,8 C14.4516129,6.83870387 14.1612932,5.76344581 13.5806452,4.77419355 C12.9999971,3.78494129 12.2150587,3.0000029 11.2258065,2.41935484 C10.2365542,1.83870677 9.16129613,1.5483871 8,1.5483871 C6.83870387,1.5483871 5.76344581,1.83870677 4.77419355,2.41935484 C3.78494129,3.0000029 3.0000029,3.78494129 2.41935484,4.77419355 C1.83870677,5.76344581 1.5483871,6.83870387 1.5483871,8 C1.5483871,9.16129613 1.83870677,10.2365542 2.41935484,11.2258065 C3.0000029,12.2150587 3.78494129,12.9999971 4.77419355,13.5806452 C5.76344581,14.1612932 6.83870387,14.4516129 8,14.4516129 Z M10,11.0967742 L7.25806452,9.09677419 C7.1505371,9.01075226 7.09677419,8.90322645 7.09677419,8.77419355 L7.09677419,3.48387097 C7.09677419,3.37634355 7.13440823,3.28494661 7.20967742,3.20967742 C7.28494661,3.13440823 7.37634355,3.09677419 7.48387097,3.09677419 L8.51612903,3.09677419 C8.62365645,3.09677419 8.71505339,3.13440823 8.79032258,3.20967742 C8.86559177,3.28494661 8.90322581,3.37634355 8.90322581,3.48387097 L8.90322581,8.06451613 L11.0645161,9.61290323 C11.1505381,9.67741968 11.1989247,9.76344032 11.2096774,9.87096774 C11.2204302,9.97849516 11.1935487,10.0752684 11.1290323,10.1612903 L10.5483871,11 C10.4838706,11.0860219 10.39785,11.1397848 10.2903226,11.1612903 C10.1827952,11.1827958 10.0860219,11.1612906 10,11.0967742 Z" />
            </g>
        </SvgIcon>),
    cross: (props) =>
        (<SvgIcon style={{ marginTop: 0.5, width: '0.7em', marginRight: -3 }}>
            <g fill={props.color} fillRule='nonzero'>
                <path d='M8,0 C9.44086742,0 10.7741874,0.360211452 12,1.08064516 C13.2258126,1.80107887 14.1989211,2.77418742 14.9193548,4 C15.6397885,5.22581258 16,6.55913258 16,8 C16,9.44086742 15.6397885,10.7741874 14.9193548,12 C14.1989211,13.2258126 13.2258126,14.1989211 12,14.9193548 C10.7741874,15.6397885 9.44086742,16 8,16 C6.55913258,16 5.22581258,15.6397885 4,14.9193548 C2.77418742,14.1989211 1.80107887,13.2258126 1.08064516,12 C0.360211452,10.7741874 0,9.44086742 0,8 C0,6.55913258 0.360211452,5.22581258 1.08064516,4 C1.80107887,2.77418742 2.77418742,1.80107887 4,1.08064516 C5.22581258,0.360211452 6.55913258,0 8,0 Z M8,14.4516129 C9.16129613,14.4516129 10.2365542,14.1612932 11.2258065,13.5806452 C12.2150587,12.9999971 12.9999971,12.2150587 13.5806452,11.2258065 C14.1612932,10.2365542 14.4516129,9.16129613 14.4516129,8 C14.4516129,6.83870387 14.1612932,5.76344581 13.5806452,4.77419355 C12.9999971,3.78494129 12.2150587,3.0000029 11.2258065,2.41935484 C10.2365542,1.83870677 9.16129613,1.5483871 8,1.5483871 C6.83870387,1.5483871 5.76344581,1.83870677 4.77419355,2.41935484 C3.78494129,3.0000029 3.0000029,3.78494129 2.41935484,4.77419355 C1.83870677,5.76344581 1.5483871,6.83870387 1.5483871,8 C1.5483871,9.16129613 1.83870677,10.2365542 2.41935484,11.2258065 C3.0000029,12.2150587 3.78494129,12.9999971 4.77419355,13.5806452 C5.76344581,14.1612932 6.83870387,14.4516129 8,14.4516129 Z M11.2903226,6 L9.29032258,8 L11.2903226,10 C11.354839,10.0860219 11.3870968,10.1827952 11.3870968,10.2903226 C11.3870968,10.39785 11.354839,10.4838706 11.2903226,10.5483871 L10.5483871,11.2903226 C10.4838706,11.354839 10.39785,11.3870968 10.2903226,11.3870968 C10.1827952,11.3870968 10.0860219,11.354839 10,11.2903226 L8,9.29032258 L6,11.2903226 C5.91397806,11.354839 5.81720484,11.3870968 5.70967742,11.3870968 C5.60215,11.3870968 5.51612935,11.354839 5.4516129,11.2903226 L4.70967742,10.5483871 C4.64516097,10.4838706 4.61290323,10.39785 4.61290323,10.2903226 C4.61290323,10.1827952 4.64516097,10.0860219 4.70967742,10 L6.70967742,8 L4.70967742,6 C4.64516097,5.91397806 4.61290323,5.81720484 4.61290323,5.70967742 C4.61290323,5.60215 4.64516097,5.51612935 4.70967742,5.4516129 L5.4516129,4.70967742 C5.51612935,4.64516097 5.60215,4.61290323 5.70967742,4.61290323 C5.81720484,4.61290323 5.91397806,4.64516097 6,4.70967742 L8,6.70967742 L10,4.70967742 C10.0860219,4.64516097 10.1827952,4.61290323 10.2903226,4.61290323 C10.39785,4.61290323 10.4838706,4.64516097 10.5483871,4.70967742 L11.2903226,5.4516129 C11.354839,5.51612935 11.3870968,5.60215 11.3870968,5.70967742 C11.3870968,5.81720484 11.354839,5.91397806 11.2903226,6 Z' />
            </g>
        </SvgIcon>),
    tick: (props) =>
        (<SvgIcon style={{ marginTop: 0.5, width: '0.7em', marginRight: -3 }}>
            <g fill={props.color} fillRule='nonzero'>
                <path d='M8,0 C9.44086742,0 10.7741874,0.360211452 12,1.08064516 C13.2258126,1.80107887 14.1989211,2.77418742 14.9193548,4 C15.6397885,5.22581258 16,6.55913258 16,8 C16,9.44086742 15.6397885,10.7741874 14.9193548,12 C14.1989211,13.2258126 13.2258126,14.1989211 12,14.9193548 C10.7741874,15.6397885 9.44086742,16 8,16 C6.55913258,16 5.22581258,15.6397885 4,14.9193548 C2.77418742,14.1989211 1.80107887,13.2258126 1.08064516,12 C0.360211452,10.7741874 0,9.44086742 0,8 C0,6.55913258 0.360211452,5.22581258 1.08064516,4 C1.80107887,2.77418742 2.77418742,1.80107887 4,1.08064516 C5.22581258,0.360211452 6.55913258,0 8,0 Z M8,1.5483871 C6.83870387,1.5483871 5.76344581,1.83870677 4.77419355,2.41935484 C3.78494129,3.0000029 3.0000029,3.78494129 2.41935484,4.77419355 C1.83870677,5.76344581 1.5483871,6.83870387 1.5483871,8 C1.5483871,9.16129613 1.83870677,10.2365542 2.41935484,11.2258065 C3.0000029,12.2150587 3.78494129,12.9999971 4.77419355,13.5806452 C5.76344581,14.1612932 6.83870387,14.4516129 8,14.4516129 C9.16129613,14.4516129 10.2365542,14.1612932 11.2258065,13.5806452 C12.2150587,12.9999971 12.9999971,12.2150587 13.5806452,11.2258065 C14.1612932,10.2365542 14.4516129,9.16129613 14.4516129,8 C14.4516129,6.83870387 14.1612932,5.76344581 13.5806452,4.77419355 C12.9999971,3.78494129 12.2150587,3.0000029 11.2258065,2.41935484 C10.2365542,1.83870677 9.16129613,1.5483871 8,1.5483871 Z M12.516129,5.74193548 C12.602151,5.82795742 12.6451613,5.92473065 12.6451613,6.03225806 C12.6451613,6.13978548 12.602151,6.22580613 12.516129,6.29032258 L6.96774194,11.8064516 C6.88172,11.8924735 6.78494677,11.9354839 6.67741935,11.9354839 C6.56989194,11.9354839 6.48387129,11.8924735 6.41935484,11.8064516 L3.48387097,8.87096774 C3.39784903,8.78494581 3.35483871,8.68817258 3.35483871,8.58064516 C3.35483871,8.47311774 3.39784903,8.3870971 3.48387097,8.32258065 L4.22580645,7.58064516 C4.2903229,7.51612871 4.37634355,7.48387097 4.48387097,7.48387097 C4.59139839,7.48387097 4.68817161,7.51612871 4.77419355,7.58064516 L6.67741935,9.5483871 L11.2580645,5 C11.322581,4.93548355 11.4086016,4.90322581 11.516129,4.90322581 C11.6236565,4.90322581 11.7204297,4.94623613 11.8064516,5.03225806 L12.516129,5.74193548 Z' />
            </g>
        </SvgIcon>),
};

