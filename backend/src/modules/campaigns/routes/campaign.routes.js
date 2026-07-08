const express = require("express");

const {
  createCampaignController,
  getCampaignsController,
  addPatientsToCampaignController,
  startCampaignController
} = require("../controllers/campaign.controller");

const router = express.Router();

router.post("/", createCampaignController);
router.get("/", getCampaignsController);
router.post("/:campaignId/patients", addPatientsToCampaignController);
router.post("/:campaignId/start", startCampaignController);

module.exports = router;