const { verifyPatientTool } = require("../services/verification.service")
const { confirmRefillTool } = require("../services/refill.service")
const { recordPaymentPreferenceTool } = require("../services/payment.service");

const verifyPatient = async (req, res) => {
    try {
        const { callId, fullName, dateOfBirth } = req.body;

        if(!callId || !fullName || !dateOfBirth){
            return res.status(400).json({
                success: false,
                message : "Call session Id, Full name and Date of birth are required."
            });
        }

        const result = await verifyPatientTool({callId, fullName, dateOfBirth});

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
        
        const { callId, confirmed } = req.body;

        if(!callId || typeof(confirmed) != "boolean"){
            return res.status(400).json({
                success: false,
                message: "Call Session Id and confirmed boolean required.",
            });
        };

        const result = await confirmRefillTool({ callId, confirmed });

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
    const { callId, paymentChoice } = req.body;

    if (!callId || !paymentChoice) {
      return res.status(400).json({
        success: false,
        message: "callId and paymentChoice are required.",
      });
    }

    const result = await recordPaymentPreferenceTool({
      callId,
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