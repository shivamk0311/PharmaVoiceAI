const getHealth = (req, res) => {
    res.status(200).json({
        'status' : 'ok',
        'service' : 'PharmaVoice Backend Service.',
        'timestamp' : new Date().toISOString(),
    });
};

module.exports = {
    getHealth,
};