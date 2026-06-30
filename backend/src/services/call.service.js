const prisma = require('../lib/prisma')

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
    
    return session;
}

module.exports = {
    startCallSession,
}