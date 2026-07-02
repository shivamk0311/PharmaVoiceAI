const prisma = require("../../../lib/prisma");

const getCallSessionByVapiCallId = async (callId) => {
  return prisma.callSession.findFirst({
    where: {
      vapiCallId: callId,
    },
    include: {
      patient: true,
    },
  });
};

module.exports = {
  getCallSessionByVapiCallId,
};