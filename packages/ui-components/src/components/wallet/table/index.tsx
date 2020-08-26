import React from "react";

import { useStyles } from './styles';

import * as fModel from '@local/f-model/src/wallet/index';

export type WalletTableCells = 'leftTokenDetails' | 'rightValueDetails';
export interface WalletTableCellProps {
    // type: WalletTableCells;
    icon: string;
    tokenName: string;
    tokenLabel: string;
    assetDetails: string;
    tokenValue: string;
    availableQuantity: string;
}

export type LeftTokenDetails = {
    // type: 'leftTokenDetails';
    icon: string;
    tokenName: string;
    tokenLabel: string;
    assetDetails: string;
};

export type RightValueDetails = {
    // type: 'rightValueDetails';
    tokenLabel: string;
    tokenValue: string;
    availableQuantity: string;
    assetDetails: string;
};

// type LeftTokenDetails = Pick<WalletTableCellProps, 'type' | 'icon' | 'tokenName' | 'tokenLabel' | 'assetDetails'> 
// type RightValueDetails = Pick<WalletTableCellProps, 'type' | 'assetDetails' | 'tokenLabel' | 'availableQuantity'>

export const SingleListRow = (props: WalletTableCellProps):React.ReactElement => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div style={{display: 'flex', justifyContent: 'space-between', height: 60}}>
                <div style={{display: 'flex'}}> 

                    <div style={{marginLeft: 5}}>
                        <img src={props.icon} alt='loading...' className={classes.iconStyle} />
                    </div>

                    <div>
                        <div className={classes.leftTopToken}> 
                            {`${props.tokenName} token (${props.tokenLabel})`}
                        </div>

                        <div className={classes.leftBottomAssetQuantity} > 
                            {`Asset: ${props.assetDetails} ${(props.tokenName === 'USD' || props.tokenName === 'EUR') ? props.tokenName : 'kg'}`}
                        </div>
                    </div>

                </div>

                <div style={{display: 'flex', flexDirection: 'column'}}>

                    <div style={{ display: 'flex', justifyContent: 'flex-end'}} className={classes.rightTopCurrentBal}>
                        {`${props.tokenValue} ${props.tokenLabel}`}
                    </div>

                     <div className={classes.rightBottomAvailableBal}>
                        {`Available: ${props.availableQuantity}`}
                    </div> 

                </div>

            </div>
            <hr/>
        </React.Fragment> 
    )
};

export type TokensListProps = {
    type: 'data';
    rows: WalletTableCellProps[];
};

export const TokensList = (props: TokensListProps):React.ReactElement => { 
    return (
    <div> 
        <hr />
        {props.rows.map( 
            (row, rowIndex) => ( <SingleListRow key={rowIndex} {...row}  /> ) 
        ) }
    </div>
) }



//--- @todo: delete below 



// export const LeftTokenDetailsCell = (props: LeftTokenDetails & Classes) => (
//     <TableCell
//         align={"left"}
//         component="th"
//         scope="row"
//     >
//         <img src={props.icon} alt='loading...' className={props.classes.iconStyle} />
//         <Typography variant='subtitle1' className={props.classes.topBlackTextStyle}>
//             {`${props.tokenName}&nbsp;token&nbsp;(${props.tokenLabel})`}
//         </Typography>
//         <Typography variant='body1' className={props.classes.bottomGreyTextStyle}> 
//         {`Asset: ${props.assetDetails}`}
//         </Typography>
//     </TableCell>
// );



// export const RightValueDetailsCell = ( props: RightValueDetails & Classes) => (
//     <TableCell
//         align='right'
//         variant='body'
//     >
//         <Typography variant='subtitle1' className={props.classes.topBlackTextStyle}>
//             {`${props.tokenValue}&nbsp;${props.tokenLabel}`}
//         </Typography>
//         <Typography variant= 'body1' className={props.classes.bottomGreyTextStyle}>
//             {`Available:&nbsp;${props.availableQuantity}`}
//         </Typography>
//     </TableCell>
// );

// export interface WalletTableRowProps {
//     rowID: string;
//     cells: readonly WalletTableCellProps[];
// }

// export type WalletTableRowProps = LeftTokenDetails & RightValueDetails;

// export const WalletTableRow = (props: WalletTableRowProps & Classes): React.ReactElement => (
//     <TableRow> 
//         <LeftTokenDetailsCell icon={props.icon} tokenName={props.tokenName} tokenLabel={props.tokenLabel} assetDetails={props.assetDetails} classes={props.classes} />
//         <RightValueDetailsCell tokenValue={props.tokenValue} tokenLabel={props.tokenLabel} assetDetails={props.assetDetails} availableQuantity={props.availableQuantity} classes={props.classes} />
//     </TableRow>
//  );

// type WalletTableBodyProps = {
//     type: 'data';
//     rows: WalletTableRowProps[];
// }


// export const WalletTableBody = (props: WalletTableBodyProps & Classes): React.ReactElement => (
//     <TableBody>
//         {props.rows.map( (row, rowIndex) => {
//             return (
//             <WalletTableRow key={rowIndex} 
//             icon={row.icon} 
//             tokenLabel={row.tokenLabel} 
//             tokenName={row.tokenName} 
//             tokenValue={row.tokenValue} 
//             assetDetails={row.assetDetails} 
//             availableQuantity={row.availableQuantity} 
//             classes={props.classes} /> 
//             );
//             } ) }
//     </TableBody>
    
// );

// export const WalletTable = (props: WalletTableBodyProps): React.ReactElement => {

//     const classes = useStyles();
//     return (
//         <Table> 
//             <WalletTableBody type={props.type} rows={props.rows} classes={classes} />
//         </Table>
//     )
// };
