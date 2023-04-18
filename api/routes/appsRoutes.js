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
} = require("../controllers/appsControllers");

router.route("/").get(getApps).post(addApp);
router.route("/topselling").get(getTopSellingApps);
router.route("/toppaid").get(getTopPaidApps);
router.route("/topgrossing").get(getTopGrossingApps);

router.route("/:id").get(getApp).put(updateApp).delete(deleteApp);

module.exports = router;
