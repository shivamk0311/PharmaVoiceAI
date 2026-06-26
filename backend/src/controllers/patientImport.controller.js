const { importPatientsFromCsv } = require("../services/patientImport.service")

const importPatients = async (req, res) => {
    try {
        if(!req.file){
            res.status(400).json({
                "message" : "CSV File is required."
            })
        }

        const result = await importPatientsFromCsv(req.file.path);

        return res.status(201).json({
            message: 'Patient import completed',
            result,
        });

    } catch (error) {
        console.error("Error importing patients: ", error);

        return res.status(500).json({
            message: "Failed to import patients",
            error: error.message,
        })
        
    }
    
}

module.exports = {
    importPatients,
};