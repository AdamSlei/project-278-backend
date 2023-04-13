const express = require("express");
const router = express.Router();

const {
  getGames,
  getGame,
  addGame,
  updateGame,
  deleteGame,
} = require("../controllers/gamesControllers");

router
  .route("/")
  .get(getGames)
  .post(addGame);

router
  .route("/:id")
  .get(getGame)
  .put(updateGame)
  .delete(deleteGame);

module.exports = router;
