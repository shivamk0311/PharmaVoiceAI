const prisma = require('../../../lib/prisma')
const { createOutboundCall } = require("../../../integrations/vapi/vapi.service")

const startCallSession = async (patientId) => {
    
    const patient = await prisma.patient.findUnique({
        where: {
            id: patientId,
        },
    });

    if(!patient){
        throw new Error("Patient not found!")
    };

    const session = await prisma.callSession.create({
        data: {
            patientId,
            status: "PENDING",
        }
    });
    
    try {

        const vapiCall = await createOutboundCall({
            patient,
            callSessionId: session.id,
        })

        const updatedSession = await prisma.callSession.update({
            where: {
                id: session.id,
            },
            data: {
                vapiCallId: vapiCall.id,
                status: "CALLING",
            },
        })

        return updatedSession;
        
    } catch (error) {
        console.error("Vapi call error:", error.response?.data || error.message);

        await prisma.callSession.update({
            where: {
                id: session.id,
            },
            data: {
                status: "FAILED",
                needsFollowUp: true,
                followUpReason: "Failed to start Vapi Outbound call."
            }
        })

        throw new Error("Failed to start outbound call.")
        
    }
}

const getAllCallSessions = async () => {
    const sessions = await prisma.callSession.findMany({
        orderBy: {
        createdAt: "desc",
        },
        include: {
        patient: true,
        },
    });

    return sessions;
}

module.exports = {
    startCallSession,
    getAllCallSessions,
}