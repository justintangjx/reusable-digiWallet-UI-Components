// @todo: Refactor this code into something neater
import * as React from 'react';

import { Paper, Typography } from '@material-ui/core';

import * as d3Scale from 'd3-scale';
import * as d3Path from 'd3-path';

import { PrcLvlX } from '@local/f-model/dist/groups/mktpl/index';

const createContourPath = ({ scaleX, scaleY, data }: {
    scaleX: d3Scale.ScaleLinear<number, number>;
    scaleY: d3Scale.ScaleLinear<number, number>;
    data: readonly { x: number, y: number }[];
}): string => {
    const path = d3Path.path();
    const yAt0 = scaleY(0);
    for (let i=0; i<data.length; ++i) {
        const datum = data[i];
        const leftX = scaleX(datum.x - 0.5);
        const rightX = scaleX(datum.x + 0.5);
        const y = scaleY(datum.y);
        if (i === 0) {
            path.moveTo(leftX, yAt0);
        }
        if (i < data.length - 1) {
            path.lineTo(leftX, y);
            path.lineTo(rightX, y);
        } else {
            path.lineTo(leftX, y);
            path.lineTo(rightX - 0.8, y);
            path.lineTo(rightX - 0.8, yAt0);
        }
    }
    return path.toString();
};

interface TickLabelProps {
    label: string;
    x: number;
    y: number;
    alignX: 'left' | 'middle' | 'right';
    alignY: 'top' | 'middle' | 'bottom';
}

const TickLabel = ({ label, x, y, alignX, alignY }: TickLabelProps): React.ReactElement => {
    const dominantBaseline =
        alignY === 'top' ? 'hanging' :
            alignY === 'middle' ? 'middle' :
                'baseline';
    const textAnchor =
        alignX === 'left' ? 'start' :
            alignX === 'middle' ? 'middle' :
                'end';
    return (<text x={x} y={y} dominantBaseline={dominantBaseline} textAnchor={textAnchor} fontSize={12} fontFamily='Roboto' fill='#222222'>{label}</text>);
}

interface GridLineProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
const GridLine = ({ x1, y1, x2, y2 }: GridLineProps) =>
    (<line x1={x1} y1={y1} x2={x2} y2={y2} stroke='rgba(216,216,216,0.5)' strokeWidth={1}/>);

const comparePriceLvlX = (left: PrcLvlX, right: PrcLvlX): number =>
    left.prc < right.prc ? -1 :
        left.prc === right.prc ? 0 :
            1;

const makeContiguous = (data: readonly PrcLvlX[]): readonly PrcLvlX[] => {
    const output: PrcLvlX[] = [];
    let previous: PrcLvlX | null = null;
    for (const datum of data) {
        if (previous !== null) {
            for (let price = previous.prc + 1; price < datum.prc; price++) {
                output.push({ prc: price, qty: 0 });
            }
        }
        output.push(datum);
        previous = datum;
    }
    return output;
}

type OuterLayoutCSSProperties = Pick<React.CSSProperties,
    // Margin
    'margin' |
    'marginLeft' |
    'marginRight' |
    'marginTop' |
    'marginBottom' |
    // Padding
    'padding' |
    'paddingLeft' |
    'paddingRight' |
    'paddingTop' |
    'paddingBottom' |
    // Absolute
    'display' |
    'position' |
    'width' |
    'minWidth' |
    'maxWidth' |
    'height' |
    'minHeight' |
    'maxHeight' |
    'left' |
    'right' |
    'top' |
    'bottom' |
    // Flex
    'order' |
    'flexGrow' |
    'flexShrink' |
    'flexBasis' |
    'flex' |
    'alignSelf'
>;

interface OrderBookPaperChartProps {
    outerLayoutCSS: OuterLayoutCSSProperties;
    dataBid: readonly PrcLvlX[];
    dataAsk: readonly PrcLvlX[];
}

export const OrderBookChartPaper = ({ outerLayoutCSS, dataBid, dataAsk }: OrderBookPaperChartProps): React.ReactElement => {
    return (
        <Paper style={{
            ...outerLayoutCSS,
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Typography style={{
                marginBottom: 18,
                fontFamily: 'Roboto',
                fontSize: 20,
                fontWeight: 500,
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: 'auto',
        }}>Market Depth Chart</Typography>
            <HookContainer
                dataBid={dataBid}
                dataAsk={dataAsk}
                outerLayoutCSS={{
                    flexGrow: 1,
                    flexShrink: 0,
                    flexBasis: 0,
                }}
            />
        </Paper>
    );
};

export const HookContainer = (props: OrderBookPaperChartProps) => {
    const outerElement = React.useRef<HTMLDivElement | null>(null);
    const [dimensions, setDimensions] = React.useState<{ width: number; height: number; } | null>(null);
    React.useEffect(() => {
        const updateSize = () => {
            if (outerElement.current !== null) {
                const rect = outerElement.current.getBoundingClientRect();
                setDimensions({
                    width: rect.width,
                    height: rect.height,
                });
            }
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [outerElement]);

    return (<div ref={outerElement}
        style={{
            ...props.outerLayoutCSS,
            overflow: 'hidden',
        }}>
        {dimensions === null ? (<div>Rendering chart...</div>) :
            (<SVGChartArea
                dataBid={props.dataBid}
                dataAsk={props.dataAsk}
                width={dimensions.width}
                height={dimensions.height}
            />)
        }
    </div>);
}

interface OrderBookChartProps {
    dataBid: readonly PrcLvlX[];
    dataAsk: readonly PrcLvlX[];
    width: number;
    height: number;
}

const SVGChartArea = ({
    dataBid: dataBidInput,
    dataAsk: dataAskInput,
    width,
    height,
}: OrderBookChartProps): React.ReactElement => {

    const dataBid = makeContiguous(dataBidInput.concat().sort(comparePriceLvlX));
    const dataAsk = makeContiguous(dataAskInput.concat().sort(comparePriceLvlX));

    const xTickCount = 10;
    const yTickCount = 10;

    const topSectionHeight = 48;
    const bottomSectionHeight = 44;
    const chartTopToYAxisLabelSpacing = 36;
    const xAxisToXAxisLabelSpacing = 28;
    const xAxisTickLength = 4;
    const xAxisToTickLabelSpacing = 7;


    const windowXMin = 0;
    const windowXMax = width;
    const windowXMid = (windowXMin + windowXMax)/2;
    const windowYMin = height - bottomSectionHeight;
    const windowYMax = topSectionHeight;


    let xMin = Math.min(...dataBid.map(d => d.prc), ...dataAsk.map(d => d.prc)) - 1;
    let xMax = Math.max(...dataBid.map(d => d.prc), ...dataAsk.map(d => d.prc)) + 1;
    let yMin = 0;
    let yMax = Math.max(...dataBid.map(d => d.qty), ...dataAsk.map(d => d.qty)) + 1;
    
    const scaleX = d3Scale.scaleLinear().domain([xMin, xMax]).range([windowXMin, windowXMax]).nice();
    const scaleY = d3Scale.scaleLinear().domain([yMin, yMax]).range([windowYMin, windowYMax]).nice();

    return (
        <svg width={width} height={height}>
            <g>
                <GridLine x1={windowXMin} y1={windowYMin} x2={windowXMin} y2={windowYMax}/>
                <GridLine x1={windowXMax} y1={windowYMin} x2={windowXMax} y2={windowYMax}/>

                {/* Axis Labels */}
                <TickLabel x={windowXMid} y={windowYMin + xAxisToXAxisLabelSpacing} alignX='middle' 
                alignY='top' label='Price'/>
                <TickLabel x={windowXMin} y={windowYMax - chartTopToYAxisLabelSpacing} alignX='left' 
                alignY='bottom' label='Volume'/>

                {/* X-Axis Ticks */}
                {scaleX.ticks(xTickCount).filter(x => Number.isInteger(x)).map(x => {
                    if (x === scaleX.domain()[0] || x === scaleX.domain()[1]) {
                        return null;
                    }
                    return (<GridLine x1={scaleX(x)} y1={windowYMin} x2={scaleX(x)} y2={windowYMin + xAxisTickLength}/>);
                })}

                {/* Y-Axis Grid Lines */}
                {scaleY.ticks(yTickCount).filter(x => Number.isInteger(x)).map(y => (
                    <GridLine x1={windowXMin} y1={scaleY(y)} x2={windowXMax} y2={scaleY(y)}/>
                ))}

                {/* X-Axis Tick Labels */}
                {scaleX.ticks(xTickCount).filter(x => Number.isInteger(x)).map(x => {
                    if (x === xMin || x === xMax) {
                        return null;
                    }
                    return (<TickLabel x={scaleX(x)} y={windowYMin + xAxisToTickLabelSpacing} alignX='middle' alignY='top' label={x.toString()}/>);
                })}

                {/* Y-Axis Tick Labels - Left */}
                {scaleY.ticks(yTickCount).filter(x => Number.isInteger(x)).map(y => {
                    if (y === yMin) {
                        return null;
                    }
                    return (<TickLabel x={windowXMin + 5} y={scaleY(y)} alignX='left' alignY='middle' label={y.toString()}/>);
                })}

                {/* Y-Axis Tick Labels - Right */}
                {scaleY.ticks(yTickCount).filter(x => Number.isInteger(x)).map(y => {
                    if (y === yMin) {
                        return null;
                    }
                    return (<TickLabel x={windowXMax - 5} y={scaleY(y)} alignX='right' alignY='middle' label={y.toString()}/>);
                })}
                <path
                    d={createContourPath({
                        scaleX,
                        scaleY,
                        data: dataBid.map(d => ({ x: d.prc, y: d.qty })),
                    })}
                    stroke='#1DD1A1'
                    fill='rgba(29,209,161,0.2)'
                    strokeWidth={1}
                />
                <path
                    d={createContourPath({
                        scaleX,
                        scaleY,
                        data: dataAsk.map(d => ({ x: d.prc, y: d.qty })),
                    })}
                    stroke='#EE5253'
                    fill='rgba(238,82,83,0.2)'
                    strokeWidth={1}
                />
            </g>
        </svg>
    );
};
