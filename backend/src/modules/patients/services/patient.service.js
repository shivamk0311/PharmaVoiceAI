const prisma = require("../../../lib/prisma")

const getAllPatients = async() => {
    const patients = prisma.patient.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    return patients;
}

module.exports = {
    getAllPatients,
}