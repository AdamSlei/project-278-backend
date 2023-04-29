const express = require("express");
const router = express.Router();

const {
  getApps,
  getApp,
  addApp,
  updateApp,
  deleteApp,
  getTopGrossingApps,
  getTopPaidApps,
  getTopSellingApps,
  getTravelApps,
  getMessagingApps,
  getProductivityApps,
  getPremiumApps,
  getRecommendedApps,
} = require("../controllers/appsControllers");

router.route("/").get(getApps).post(addApp);

router.route("/topselling").get(getTopSellingApps);
router.route("/toppaid").get(getTopPaidApps);
router.route("/topgrossing").get(getTopGrossingApps);

router.route("/travel").get(getTravelApps);
router.route("/messaging").get(getMessagingApps);
router.route("/productivity").get(getProductivityApps);
router.route("/premium").get(getPremiumApps);
router.route("/recommended").get(getRecommendedApps);

router.route("/:id").get(getApp).put(updateApp).delete(deleteApp);

module.exports = router;
