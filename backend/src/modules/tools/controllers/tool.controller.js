const { verifyPatientTool } = require("../services/verification.service")
const { confirmRefillTool } = require("../services/refill.service")
const { recordPaymentPreferenceTool } = require("../services/payment.service");

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

const recordPaymentPreference = async (req, res) => {
  try {
    const { callSessionId, paymentChoice } = req.body;

    if (!callSessionId || !paymentChoice) {
      return res.status(400).json({
        success: false,
        message: "callSessionId and paymentChoice are required.",
      });
    }

    const result = await recordPaymentPreferenceTool({
      callSessionId,
      paymentChoice,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Record Payment Preference Tool error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to record payment preference.",
    });
  }
};

module.exports = {
    verifyPatient,
    confirmRefill,
    recordPaymentPreference,
};