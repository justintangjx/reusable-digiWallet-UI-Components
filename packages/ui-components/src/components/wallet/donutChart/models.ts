export interface DoughnutSegmentProps {
    tokenID: number;
    tokenName: string;
    value: number; 
}

// export type DoughtnutSegmentsList = DoughnutSegmentProps[];

export interface DoughtnutSegmentsList {
    segmentsList: DoughnutSegmentProps[];
}

export const doughnutData: DoughtnutSegmentsList = {
    segmentsList: [
        {
            tokenID: 1,
            tokenName: "gold",
            value: 84
        },
        {
            tokenID: 2,
            tokenName: "silver",
            value: 50
        },
        {
            tokenID: 3,
            tokenName: "usd",
            value: 18
        }
    ]
};

export const findDashOffset = (ID: number, Arr: DoughnutSegmentProps[]) => {
    let sumPrecedingSegmentsLength = 0;
    if ((ID = 1)) {
        return 25;
    }
    for (let i = 0; i < ID; i++) {
        sumPrecedingSegmentsLength += Arr[i]["value"];
    }

    return 100 - sumPrecedingSegmentsLength + 25;
};

export const generateRandomColor = () => {
    return '#' + Math.round(Math.random()*16777215).toString(16);
};

export const conversionToProportion = ( value: number, apiReturn: DoughtnutSegmentsList['segmentsList'] ) => {
    const rCallBack = ( acc: number, cur: number ) =>  acc + cur ;
    const totalRawValue = apiReturn.map( (tokenObj) => tokenObj.value).reduce(rCallBack);

    return (value/totalRawValue * 100);

}