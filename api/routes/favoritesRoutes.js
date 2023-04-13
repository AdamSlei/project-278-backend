const express = require("express");
const router = express.Router();

const {
  getFavorites,
  getFavorite,
  addFavorite,
  updateFavorite,
  deleteFavorite,
} = require("../controllers/favoritesControllers");

router
  .route("/")
  .get(getFavorites)
  .post(addFavorite);

router
  .route("/:id")
  .get(getFavorite)
  .put(updateFavorite)
  .delete(deleteFavorite);

module.exports = router;
