const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersControllers");

router
  .route("/")
  .get(getUsers)
  .post(addUser)
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;