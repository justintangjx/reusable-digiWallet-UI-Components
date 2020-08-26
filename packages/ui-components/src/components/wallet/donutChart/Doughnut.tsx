import React from "react";

import * as DoughnutModels from "./models";

// ---

export const Doughnut = (
    props: DoughnutModels.DoughtnutSegmentsList
): React.ReactElement => {
    return (
        <div>
            <svg width="500" height="500" viewBox="0 0 50 50">
                <circle
                    // class="donut-hole"
                    cx="21"
                    cy="21"
                    r="15.91549430918954"
                    fill="#fff"
                />
                <circle
                    // class="donut-ring"
                    cx="21"
                    cy="21"
                    r="15.91549430918954"
                    fill="transparent"
                    stroke="#d2d3d4"
                    strokeWidth="10"
                />

                {props.segmentsList.map(segmentObj => {
                    return (
                        <circle
                            key={segmentObj.tokenID}
                            cx="21"
                            cy="21"
                            r="15.91549430918954"
                            fill="transparent"
                            stroke={DoughnutModels.generateRandomColor()}
                            strokeWidth="10"
                            strokeDasharray={`${DoughnutModels.conversionToProportion(
                                segmentObj.value,
                                props.segmentsList
                            )} ${100 -
                                DoughnutModels.conversionToProportion(
                                    segmentObj.value,
                                    props.segmentsList
                                )}`}
                            // strokeDasharray={`${segmentObj.value} ${100 -
                            //     segmentObj.value}`}
                            strokeDashoffset={`${DoughnutModels.findDashOffset(
                                segmentObj.tokenID,
                                props.segmentsList
                            )}`}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

// export const Doughnut = (props: DoughnutProps.DoughtnutSegments): React.ReactElement => {
//     return (
//         <svg width="500" height="500" viewBox="0 0 50 50">
//             <circle
//                 // class="donut-hole"
//                 cx="21"
//                 cy="21"
//                 r="15.91549430918954"
//                 fill="#fff"
//             />
//             <circle
//                 // class="donut-ring"
//                 cx="21"
//                 cy="21"
//                 r="15.91549430918954"
//                 fill="transparent"
//                 stroke="#d2d3d4"
//                 stroke-width="10"
//             />

//             <circle
//                 // class="donut-segment"
//                 cx="21"
//                 cy="21"
//                 r="15.91549430918954"
//                 fill="transparent"
//                 stroke="#ce4b99"
//                 stroke-width="10"
//                 stroke-dasharray="40 60"
//                 stroke-dashoffset="25"
//             />

//             <circle
//                 // class="donut-segment"
//                 cx="21"
//                 cy="21"
//                 r="15.91549430918954"
//                 fill="transparent"
//                 stroke="#b1c94e"
//                 stroke-width="10"
//                 stroke-dasharray="20 80"
//                 stroke-dashoffset="85"
//             />

//             <circle
//                 // class="donut-segment"
//                 cx="21"
//                 cy="21"
//                 r="15.91549430918954"
//                 fill="transparent"
//                 stroke="#377bbc"
//                 stroke-width="10"
//                 stroke-dasharray="30 70"
//                 stroke-dashoffset="65"
//             />

//             {/* <circle
//                 // class="donut-segment"
//                 cx="21"
//                 cy="21"
//                 r="15.91549430918954"
//                 fill="transparent"
//                 stroke="#b1c94e"
//                 stroke-width="5"
//                 stroke-dasharray="5 95"
//                 stroke-dashoffset="35"
//             /> */}
//         </svg>
//     );
// };

// export const DonutChart = (props: DoughnutItemProps) => {
//     return (
//         <figure>
//             <div>
//                 <Doughnut />
//             </div>
//             <g>
//                 <ul>
//                     <li>
//                         <span> 50% USDT </span>
//                     </li>
//                     <li>
//                         <span> 35% EAU </span>
//                     </li>
//                     <li>
//                         <span> 10% EURT </span>
//                     </li>
//                     <li>
//                         <span> 5% EAG </span>
//                     </li>
//                 </ul>
//             </g>
//         </figure>
//     );
// };
