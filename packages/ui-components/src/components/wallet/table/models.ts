// import { WalletTableBodyProps } from './index';
import { TokensListProps } from './index';

import { silverEAGIcon, goldEAUIcon, eurEURTIcon, usdUSDTIcon } from './svgs';

export const walletTokensData: TokensListProps = {
    type: "data",
    rows: [
        {
            icon: usdUSDTIcon,
            tokenName: "USD",
            tokenLabel: "USDT",
            tokenValue: "300,000",
            assetDetails: "300,000",
            availableQuantity: "298,500"
        },
        {
            icon: goldEAUIcon,
            tokenName: "Gold",
            tokenLabel: "EAU",
            tokenValue: "500",
            assetDetails: "5",
            availableQuantity: "460"
        },
        {
            icon: eurEURTIcon,
            tokenName: "EUR",
            tokenLabel: "EURT",
            tokenValue: "52,928",
            assetDetails: "52,928",
            availableQuantity: "52,933"
        },
        {
            icon: silverEAGIcon,
            tokenName: "Silver",
            tokenLabel: "EAG",
            tokenValue: "6,000",
            assetDetails: "60 kg",
            availableQuantity: "6,000"
        },
        {
            icon: "placeHolder",
            tokenName: "Rhodium",
            tokenLabel: "RDM",
            assetDetails: "333 kg",
            tokenValue: "3,000",
            availableQuantity: "1"
        },
    ]
};