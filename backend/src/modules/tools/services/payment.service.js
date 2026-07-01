const prisma = require("../../../lib/prisma");

const recordPaymentPreferenceTool = async ({ callSessionId, paymentChoice }) => {
  const callSession = await prisma.callSession.findUnique({
    where: {
      id: callSessionId,
    },
    include: {
      patient: true,
    },
  });

  if (!callSession) {
    return {
      success: false,
      message: "Call session not found.",
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
      id: callSessionId,
    },
    data: {
      paymentChoice,
      paymentStatus: "PENDING_STAFF_ACTION",
      conversationState: "COMPLETED",
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
        ? "Patient requested to use the card on file. Inform the patient that pharmacy staff will process it."
        : "Patient requested a payment link. Inform the patient that pharmacy staff will send the payment link.",
  };
};

module.exports = {
  recordPaymentPreferenceTool,
};