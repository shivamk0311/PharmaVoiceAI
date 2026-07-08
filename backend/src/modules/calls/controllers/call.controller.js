const {startCallSession, getAllCallSessions, updateCallSessions} = require("../services/call.service")

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

const getCalls = async (req, res) => {
    try {
        
        const calls = await getAllCallSessions();

        return res.status(200).json({
            message: "Calls Fetched Successfully!",
            counts: calls.length,
            calls
        });

    } catch (error) {
        console.error("Get Calls Error: ", error);

        return res.status(500).json({
            message: "Failed to fetch calls",
            error: error.message,
        })
    }
}

const updateCall = async (req, res) => {
    try {
        const {callId} = req.params;

        const session = await updateCallSessions(callId);
        return res.status(201).json({
            message: "Call Session updated.",
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
    getCalls,
    updateCall
}