const express = require("express");
const router = express.Router();

const {
  getFavorites,
  getFavorite,
  addFavorite,
  deleteFavorite,
} = require("../controllers/favoritesControllers");

router.route("/").get(getFavorites).post(addFavorite);

router
  .route("/:id")
  .get(getFavorite)
  .delete(deleteFavorite);

module.exports = router;
