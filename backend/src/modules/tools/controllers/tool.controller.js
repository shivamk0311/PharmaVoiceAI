const { verifyPatientTool } = require("../services/verification.service")
const { confirmRefillTool } = require("../services/refill.service")
const { recordPaymentPreferenceTool } = require("../services/payment.service");




const extractVapiToolCall = (req) => {
  const message = req.body?.message;
  const toolCall = message?.toolCallList?.[0];

  if (message?.type === "tool-calls" && toolCall) {
    return {
      isVapi: true,
      toolCallId: toolCall.id,
      toolName: toolCall.name,
      callId: message.call?.id,
      args: toolCall.function.arguments || {},
    };
  }

  return {
    isVapi: false,
    callId: req.body.callId,
    args: req.body,
  };
};

const sendToolResponse = (res, extracted, result) => {
  if (extracted.isVapi) {
    return res.status(200).json({
      results: [
        {
          toolCallId: extracted.toolCallId,
          result,
        },
      ],
    });
  }

  return res.status(200).json(result);
};



const verifyPatient = async (req, res) => {
    try {

        console.log("VERIFY TOOL BODY:", JSON.stringify(req.body, null, 2));

        const extracted = extractVapiToolCall(req);

        console.log("Extracted:", extracted);

        const { fullName, dateOfBirth } = extracted.args;
        const callId = extracted.callId;

        // const { callId, fullName, dateOfBirth } = req.body;

        if(!callId || !fullName || !dateOfBirth){
            return res.status(400).json({
                success: false,
                message : "Call session Id, Full name and Date of birth are required."
            });
        }

        const result = await verifyPatientTool({callId, fullName, dateOfBirth});
        console.log("Result:", result);

        return sendToolResponse(res, extracted, result);

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
        
        console.log("CONFIRM REFILL TOOL BODY:", JSON.stringify(req.body, null, 2));

        const extracted = extractVapiToolCall(req);

        // console.log("Extracted:", extracted);

        const { confirmed } = extracted.args;
        const callId = extracted.callId;

        if(!callId || typeof(confirmed) != "boolean"){
            return res.status(400).json({
                success: false,
                message: "Call Session Id and confirmed boolean required.",
            });
        };

        const result = await confirmRefillTool({ callId, confirmed });

        // return res.status(200).json(result);
        return sendToolResponse(res, extracted, result);

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

    console.log("CONFIRM REFILL TOOL BODY:", JSON.stringify(req.body, null, 2));

    const extracted = extractVapiToolCall(req);
    const { paymentChoice } = extracted.args;
    const callId = extracted.callId;

    // const { callId, paymentChoice } = req.body;

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

    // return res.status(200).json(result);
    return sendToolResponse(res, extracted, result);

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