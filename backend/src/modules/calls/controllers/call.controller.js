const {startCallSession} = require("../services/call.service")

const startCall = async(req, res) => {
    try {
        
        const {patientId} = req.params;

        const session = await startCallSession(patientId);

        return res.status(201).json({
            message: "Call Session Created.",
            session,
        })
    } catch (error) {
        console.error(error);

        return res.status(400).json({
            message: error.message,
        })
    }
}

module.exports = {
    startCall,
}