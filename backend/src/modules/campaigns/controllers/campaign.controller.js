const {
  createCampaign,
  getCampaigns,
  addPatientsToCampaign,
  startCampaign
} = require("../services/campaign.service");

const createCampaignController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Campaign name is required",
      });
    }

    const campaign = await createCampaign({ name });

    return res.status(201).json({
      message: "Campaign created successfully",
      campaign,
    });
  } catch (error) {
    console.error("Create campaign error:", error);

    return res.status(500).json({
      message: "Failed to create campaign",
      error: error.message,
    });
  }
};

const getCampaignsController = async (req, res) => {
  try {
    const campaigns = await getCampaigns();

    return res.status(200).json({
      message: "Campaigns fetched successfully",
      count: campaigns.length,
      campaigns,
    });
  } catch (error) {
    console.error("Get campaigns error:", error);

    return res.status(500).json({
      message: "Failed to fetch campaigns",
      error: error.message,
    });
  }
};

const addPatientsToCampaignController = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { patientIds } = req.body;

    if (!Array.isArray(patientIds) || patientIds.length === 0) {
      return res.status(400).json({
        message: "patientIds must be a non-empty array",
      });
    }

    const campaign = await addPatientsToCampaign({
      campaignId,
      patientIds,
    });

    return res.status(200).json({
      message: "Patients added to campaign",
      campaign,
    });
  } catch (error) {
    console.error("Add patients to campaign error:", error);

    return res.status(500).json({
      message: "Failed to add patients to campaign",
      error: error.message,
    });
  }
};

const startCampaignController = async (req, res) => {
  try {
    const { campaignId } = req.params;

    const result = await startCampaign({ campaignId });

    return res.status(200).json({
      message: "Campaign started",
      result,
    });
  } catch (error) {
    console.error("Start campaign error:", error);

    return res.status(500).json({
      message: "Failed to start campaign",
      error: error.message,
    });
  }
};

module.exports = {
  createCampaignController,
  getCampaignsController,
  addPatientsToCampaignController,
  startCampaignController
};