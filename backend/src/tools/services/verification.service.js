const prisma = require("../../lib/prisma")

const normalizeName = (fullName) => {
    return fullName.trim().toLowerCase().replace(/\s+/g," ");
};

const normalizeDOB = (dateOfBirth) => {
    const date = new Date(dateOfBirth)

    if(Number.isNaN(date.getTime())){
        return null;
    }

    return date.toISOString().slice(0,10);
}

const verifyPatientTool = async ({callSessionId, fullName, dateOfBirth}) => {

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

    const providedName = normalizeName(fullName);
    const storedName = normalizeName(callSession.patient.fullName);

    const providedDOB = normalizeDOB(dateOfBirth);
    const storedDOB = normalizeDOB(callSession.patient.dateOfBirth);

    const nameMatches = providedName === storedName;
    const dobMatches = providedDOB === storedDOB;

    if(nameMatches && dobMatches){
        await prisma.callSession.update({
            where: {
                id: callSessionId,
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
            id: callSessionId,
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