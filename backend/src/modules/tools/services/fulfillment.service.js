const prisma = require("../../../lib/prisma")
const { getCallSessionByVapiCallId } = require('../services/toolSession.service')

const recordFulfillmentChoiceTool = async ( {callId, fulfillmentChoice, deliveryAddress}) => {

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
      message: "Patient must be verified before recording fulfillment choice.",
    };
  }

  if (!callSession.refillConfirmed) {
    return {
      success: false,
      message: "Refill must be confirmed before recording fulfillment choice.",
    };
  }

  if (!callSession.paymentChoice) {
    return {
        success: false,
        message: "Payment Preference must be done before recording fulfillment choice."
    }
  }

  if (callSession.conversationState !== "FULFILLMENT_CHOICE") {
    return {
      success: false,
      message: "Payment preference cannot be recorded at this conversation state.",
    };
  }

  if (!["PICKUP", "DELIVERY"].includes(fulfillmentChoice)) {
    return {
      success: false,
      message: "Invalid fulfillment choice. Use PICKUP or DELIVERY.",
    };
  }

  if (fulfillmentChoice === "DELIVERY" && !deliveryAddress) {
    return {
      success: false,
      message: "Delivery address is required for delivery.",
    };
  }

    const updatedSession = await prisma.callSession.update({
        where: {
        id: callSession.id,
        },
        data: {
        fulfillmentChoice,
        deliveryAddress:
            fulfillmentChoice === "DELIVERY" ? deliveryAddress : null,
        conversationState: "COMPLETED",
        },
    });

    return {
        success: true,
        fulfillmentChoice: updatedSession.fulfillmentChoice,
        deliveryAddress: updatedSession.deliveryAddress,
        nextState: updatedSession.conversationState,
        medicationName: callSession.patient.medicationName,
        copayAmount: callSession.patient.copayAmount,
        message:
        fulfillmentChoice === "PICKUP"
            ? "Patient chose pickup. Inform the patient that pharmacy staff will follow up when the medication is ready."
            : "Patient chose delivery. Inform the patient that pharmacy staff will review the delivery address and follow up if needed.",
    };


}

module.exports = {
    recordFulfillmentChoiceTool,
}