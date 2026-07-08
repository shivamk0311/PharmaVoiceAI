const prisma = require("../../../lib/prisma");
const { startCallSession } = require("../../calls/services/call.service");

const createCampaign = async ({ name }) => {
  return prisma.campaign.create({
    data: { name },
  });
};

const getCampaigns = async () => {
  return prisma.campaign.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      patients: {
        include: {
          patient: true,
        },
      },
    },
  });
};

const addPatientsToCampaign = async ({ campaignId, patientIds }) => {
  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
  });

  if (!campaign) {
    throw new Error("Campaign not found");
  }

  const data = patientIds.map((patientId) => ({
    campaignId,
    patientId,
  }));

  await prisma.campaignPatient.createMany({
    data,
    skipDuplicates: true,
  });

  return prisma.campaign.findUnique({
    where: { id: campaignId },
    include: {
      patients: {
        include: {
          patient: true,
        },
      },
    },
  });
};

const startCampaign = async ({campaignId}) => {
    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        include: {
            patients: {
                include: {
                    patient: true,
                },
            },
        },
    });

    if (!campaign) {
        throw new Error("Campaign not found");
    }

    if (campaign.patients.length === 0) {
        throw new Error("Campaign has no patients");
    }

    await prisma.campaign.update({
        where: { id: campaignId },
        data: {
        status: "RUNNING",
        },
    });

    const results = []

    for( const campaignPatient of campaign.patients){
        try {
            const callSession = await startCallSession(campaignPatient.patientId);

            results.push({
                patientId: campaignPatient.patientId,
                patientName: campaignPatient.patient.fullName,
                success:true,
                callSession
            })

        } catch (error) {
            results.push({
                patientId: campaignPatient.patientId,
                patientName: campaignPatient.patient.fullName,
                success: false,
                error: error.message,
            });
        }
    }

    return {
        campaignId,
        status: "RUNNING",
        totalPatients: campaign.patients.length,
        startedCalls: results.filter((r) => r.success).length,
        failedCalls: results.filter((r) => !r.success).length,
        results,
    };
};

module.exports = {
  createCampaign,
  getCampaigns,
  addPatientsToCampaign,
  startCampaign,
};