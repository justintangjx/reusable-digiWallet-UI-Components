import * as React from "react";

import {
    Typography,
    Card,
    CardActions,
    CardContent,
    Button
} from "@material-ui/core";

import {
    OnTokenize as OnTokenizeProps,
    AssetCard as AssetCardProps,
    AssetCards as AssetCardsProps,
} from './models';

import { useStyles } from './styles';

// ---

export { AssetCard as AssetCardProps } from './models';
const AssetCard = (
    props: AssetCardProps & OnTokenizeProps,
): React.ReactElement => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <div className={classes.headerAndIconWrapper}>
                    <img src={props.iconSrc} alt={"Loading..."} />
                    <div>
                        <Typography
                            variant="h5"
                            component="h3"
                            className={classes.headerTitle}
                        >
                            {props.assetTypeAndTokenTypeLabel}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            className={classes.conversionRate}
                        >
                            {props.conversionRate}
                        </Typography>
                    </div>
                </div>
            </CardContent>
            <CardActions className={classes.cardAction}>
                <Button
                    size="medium"
                    color="primary"
                    className={classes.btn}
                    onClick={() => { props.onTokenize(props.id); }}
                >
                    Tokenize
                </Button>
            </CardActions>
        </Card>
    );
};

// ---

export { AssetCards as AssetCardsProps } from './models';
export const AssetCards = (
    props: AssetCardsProps,
): React.ReactElement => {
    const classes = useStyles();
    return (
        <div className={classes.listContainer}>
            {props.cards.map(card => (
                <AssetCard
                    {...card}
                    onTokenize={props.onTokenize}
                    key={card.id}
                />
            ))}
        </div>
    );
};
