// @todo: To factor this out. In common with tables tooltips

// Order status tooltip texts

export const orderStatusTooltips = {

    assetOwner: {
        orderAccepted: 'Custodian and token creator accepted the appointment. Your order is being processed.',
        orderCreated: 'Waiting for custodian and token creator to accept appointment.',
    },

    assetCustodian: {
        orderAccepted: 'Token creator has accepted the appointment. You can now register the asset.',
        orderCreated: 'Waiting for token creator to accept the appointment.',
    },

    tokenCreator: {
        orderCreated : 'Waiting for custodian to accept the appointment',
        orderAccepted : 'Custodian has accepted the appointment. Asset registration is in progress. You can mint token once the asset is registered.',
    },

};
