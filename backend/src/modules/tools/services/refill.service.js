const prisma = require('../../../lib/prisma');

const confirmRefillTool = async ({callSessionId, confirmed}) => {

    const callSession = await prisma.callSession.findUnique({
        where: {
            id: callSessionId,
        },
        include: {
            patient: true,
        }
    });

    if(!callSession){
        return {
            success: false,
            verified: false,
            message: "Call Session not found."
        }
    }

    if (!callSession.verificationPassed) {
        return {
        success: false,
        message: "Patient must be verified before confirming refill.",
        };
    }

    if(confirmed){
        await prisma.callSession.update({
            where: {
                id: callSessionId,
            },
            data: {
                refillConfirmed: true,
                conversationState: "PAYMENT_SELECTION",
            },
        });

        const paymentOptions = ['PAYMENT_LINK']

        if(callSession.patient.hasCardOnFile){
            paymentOptions.push("CARD_ON_FILE");
        }

        return {
            success: true,
            refillConfirmed: true,
            nextState: "PAYMENT_SELECTION",
            medicationName: callSession.patient.medicationName,
            copayAmount: callSession.patient.copayAmount,
            hasCardOnFile: callSession.patient.hasCardOnFile,
            paymentOptions,
            message: "Patient confirmed refill. Ask how they would like to pay.",
        }
    };

    await prisma.callSession.update({
        where: {
            id: callSessionId,
        },
        data: {
            refillConfirmed: false,
            conversationState: "COMPLETED",
        },
    });

    return {
        success: true,
        refillConfirmed: false,
        nextState: "COMPLETED",
        message: "Patient declined the refill. End the call politely and let them know the pharmacy will not proceed with payment.",

    }
}

module.exports = {
    confirmRefillTool,
}