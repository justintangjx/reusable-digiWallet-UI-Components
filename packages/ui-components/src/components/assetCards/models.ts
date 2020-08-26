export interface OnTokenize {
    onTokenize: (id: string) => void;
}

// @todo: This might be better as a AssetTypeAndTokenTypeConfigItem
export interface AssetCard {
    id: string;
    iconSrc: string;
    assetTypeAndTokenTypeLabel: string;
    conversionRate: string;
};

// ---

export interface AssetCards extends OnTokenize {
    cards: readonly AssetCard[];
};
