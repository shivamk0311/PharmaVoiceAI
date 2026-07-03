const prisma = require("../../../lib/prisma")
const { getCallSessionByVapiCallId } = require("./toolSession.service");


const normalizeDOB = (dateOfBirth) => {

    if (!dateOfBirth) return null;

    const value = String(dateOfBirth).trim();

    // MMDDYYYY from keypad, example 03151980
    if (/^\d{8}$/.test(value)) {
        const month = value.slice(0, 2);
        const day = value.slice(2, 4);
        const year = value.slice(4, 8);
        return `${year}-${month}-${day}`;
    }

    const date = new Date(dateOfBirth)

    if(Number.isNaN(date.getTime())){
        return null;
    }

    return date.toISOString().slice(0,10);
}

const verifyPatientTool = async ({callId, dateOfBirth}) => {

    const callSession = await getCallSessionByVapiCallId(callId);

    if (!callSession) {
        return {
        success: false,
        verified: false,
        message: "Call session not found for this Vapi call.",
        };
    }

    const providedDOB = normalizeDOB(dateOfBirth);
    const storedDOB = normalizeDOB(callSession.patient.dateOfBirth);

    const dobMatches = providedDOB === storedDOB;

    if(dobMatches){
        await prisma.callSession.update({
            where: {
                id: callSession.id,
            },
            data: {
                verificationPassed: true,
                conversationState: "REFILL_DISCUSSION",
            },
        });

        return {
            success: true,
            verified: true,
            patientName: callSession.patient.fullName,
            medicationName: callSession.patient.medicationName,
            copayAmount: callSession.patient.copayAmount,
            hasCardOnFile: callSession.patient.hasCardOnFile,
            nextState: "REFILL_DISCUSSION",
            message: "Patient verified successfully."
        }
    };

    await prisma.callSession.update({
        where: {
            id: callSession.id,
        },
        data: {
            verificationPassed: false,
            needsFollowUp: true,
            followUpReason: "Patient Verification failed.",
            conversationState: "FOLLOW_UP",
        },
    });

    return {
        success: true,
        verifed: false,
        nextState: "FOLLOW_UP",
        message: "The provided information did not match our records. End the call politely and tell the patient the pharmacy will follow up.",
    };

}

module.exports = {
    verifyPatientTool,
}