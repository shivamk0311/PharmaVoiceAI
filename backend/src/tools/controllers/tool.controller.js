const { verifyPatientTool } = require("../services/tool.service")

const verifyPatient = async (req, res) => {
    try {
        const { callSessionId, fullName, dateOfBirth } = req.body;

        if(!callSessionId || !fullName || !dateOfBirth){
            return res.status(400).json({
                success: false,
                message : "Call session Id, Full name and Date of birth are required."
            });
        }

        const result = await verifyPatientTool({callSessionId, fullName, dateOfBirth});

        return res.status(200).json(result);

    } catch (error) {
        console.error("verifyPatient tool error: ", error);

        return res.status(500).json({
            success: false,
            message: "Failed to verify patient."
        });
        
    }
}

module.exports = {
    verifyPatient,
};