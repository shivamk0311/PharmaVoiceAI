const axios = require('axios');

const createOutboundCall = async({ patient, callSessionId }) => {

    const response = await axios.post(
        "https://api.vapi.ai/call",
        {
            assistantId: process.env.VAPI_ASSISTANT_ID,
            phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID,
            customer: {
                number: patient.phoneNumber,
            },
            metadata: {
                patientId: patient.id,
                callSessionId
            },
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
                "Content-Type": "application/json",
            }
        }
        
    )

    return response.data;
}

module.exports = {
    createOutboundCall,
}

