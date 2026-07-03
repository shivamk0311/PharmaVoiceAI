const prisma = require("../../../lib/prisma");
const { getCallSessionByVapiCallId } = require('../services/toolSession.service')

const recordPaymentPreferenceTool = async ({ callId, paymentChoice }) => {
    
    const callSession = await getCallSessionByVapiCallId(callId);

    if (!callSession) {
        return {
        success: false,
        verified: false,
        message: "Call session not found for this Vapi call.",
        };
    }

  if (!callSession.verificationPassed) {
    return {
      success: false,
      message: "Patient must be verified before recording payment preference.",
    };
  }

  if (!callSession.refillConfirmed) {
    return {
      success: false,
      message: "Refill must be confirmed before recording payment preference.",
    };
  }

  if (callSession.conversationState !== "PAYMENT_SELECTION") {
    return {
      success: false,
      message: "Payment preference cannot be recorded at this conversation stage.",
    };
  }

  if (!["CARD_ON_FILE", "PAYMENT_LINK"].includes(paymentChoice)) {
    return {
      success: false,
      message: "Invalid payment choice. Use CARD_ON_FILE or PAYMENT_LINK.",
    };
  }

  if (paymentChoice === "CARD_ON_FILE" && !callSession.patient.hasCardOnFile) {
    return {
      success: false,
      message: "No card on file is available for this patient.",
    };
  }

  const updatedSession = await prisma.callSession.update({
    where: {
      id: callSession.id,
    },
    data: {
      paymentChoice,
      paymentStatus: "PENDING_STAFF_ACTION",
      conversationState: "FULFILLMENT_CHOICE",
    },
  });

  return {
    success: true,
    paymentChoice: updatedSession.paymentChoice,
    paymentStatus: updatedSession.paymentStatus,
    nextState: updatedSession.conversationState,
    medicationName: callSession.patient.medicationName,
    copayAmount: callSession.patient.copayAmount,
    message:
      paymentChoice === "CARD_ON_FILE"
        ? "Payment preference recorded. Inform patient the pharmacy staff will process the payment. Now ask the patient whether they want pickup from the pharmacy or home delivery."
        : "Patient requested a payment link. Inform the patient that pharmacy staff will send the payment link. Now ask the patient whether they want pickup from the pharmacy or home delivery.",
  };
};

module.exports = {
  recordPaymentPreferenceTool,
};