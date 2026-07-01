const { handleWebhook } = require('../../../integrations/vapi/vapiWebhook.service')

const receiveWebhook = async (req, res) => {
    try {
        res.status(200).json({"success": "true"})

        await handleWebhook(req.body);
    } catch (error) {
        console.error("Vapi webhook error: ", error);
    }
}

module.exports = {
    receiveWebhook,
}