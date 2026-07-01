const { verifyPatientTool } = require("../services/verification.service")
const { confirmRefillTool } = require("../services/refill.service")

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
        console.error("Verify Patient Tool error: ", error);

        return res.status(500).json({
            success: false,
            message: "Failed to verify patient."
        });
        
    }
}

const confirmRefill = async (req, res) => {
    try {
        
        const { callSessionId, confirmed } = req.body;

        if(!callSessionId || typeof(confirmed) != "boolean"){
            return res.status(400).json({
                success: false,
                message: "Call Session Id and confirmed boolean required.",
            });
        };

        const result = await confirmRefillTool({ callSessionId, confirmed });

        return res.status(200).json(result);

    } catch (error) {
        console.error("Confirm Refill Tool error: ", error);

        return res.status(500).json({
            success: false,
            message: "Failed to confirm refill."
        })
    }
}

module.exports = {
    verifyPatient,
    confirmRefill,
};