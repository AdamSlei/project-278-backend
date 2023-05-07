const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersControllers");

router.route("/").get(getUsers).post(addUser);
router.route("/login").get(getUser)

router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;
