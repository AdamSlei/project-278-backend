const express = require("express");
const router = express.Router();

const {
  getApps,
  getApp,
  addApp,
  updateApp,
  deleteApp,
} = require("../controllers/appsControllers");

router.route("/").get(getApps).post(addApp);

router.route("/:id").get(getApp).put(updateApp).delete(deleteApp);

module.exports = router;
