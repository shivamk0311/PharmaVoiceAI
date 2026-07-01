const prisma = require("../../lib/prisma")

const getCallSessionIdFromPayload = (payload) => {
    return (
        payload?.message?.call?.metadata?.callSessionId ||
        payload?.call?.metadata?.callSessionId ||
        payload?.metadata?.callSessionId 
    );
}

const getEventType = (payload) => {
    return (
        payload?.message?.type || payload?.type
    );
}

const getTranscript = (payload) => {
    return (
        payload?.message?.artifact?.transcript ||
        payload?.message?.transcript ||
        payload?.transcript ||
        null
    );
}

const handleWebhook = async (payload) => {
    const eventType = getEventType(payload);
    const callSessionId = getCallSessionIdFromPayload(payload);

    if(!callSessionId){
        console.warn("Missing call session id.")
        return;
    }

    console.log("Vapi webhook received: ", {eventType, callSessionId});

    if(eventType === 'call-started'){
        await prisma.callSession.update({
            where: {
                id: callSessionId,
            },
            data: {
                status: "CALLING",
            },
        });
        return;
    }

    if(eventType === 'end-of-call-report'){
        const transcript = getTranscript(payload);

        await prisma.callSession.update({
            where: {
                id: callSessionId,
            },
            data: {
                status: "COMPLETED",
                transcript
            },
        });
        return;
    }

    console.log("Unhandled Vapi event: ", eventType);
}

module.exports = {
    handleWebhook,
};