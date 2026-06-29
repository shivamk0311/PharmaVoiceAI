const { getAllPatients } = require('../services/patient.service')

const getPatients = async (req, res) => {

    try {
        const patients = await getAllPatients();

        return res.status(200).json({
            message: "Patient imported successfully.",
            count: patients.length,
            patients
        });
    } catch (error) {
        console.error('Error fetching patients: ', error);

        return res.status(500).json({
            message: 'Error fetching patients from database.',
            error: error.message
        });
    }
}

module.exports = {
    getPatients,
}