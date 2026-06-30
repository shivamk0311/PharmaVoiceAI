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
        console.log("Body:",req.body);
        console.log("Params:",req.params);
        console.log("Query:",req.query);


        return res.status(400).json({
            message: error.message,
        })
    }
}

module.exports = {
    startCall,
}