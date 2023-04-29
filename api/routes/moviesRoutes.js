const express = require("express");
const router = express.Router();

const {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
  getActionMovie,
  getAnimationMovie,
  getComedyMovie,
  getDocumentaryMovie,
  getHistoryMovie,
  getTopMovie,
  getTopSellingMovie,
} = require("../controllers/moviesControllers");

router.route("/").get(getMovies).post(addMovie);

router.route("/action").get(getActionMovie);
router.route("/animation").get(getAnimationMovie);
router.route("/comedy").get(getComedyMovie);
router.route("/documentary").get(getDocumentaryMovie);
router.route("/history").get(getHistoryMovie);

router.route("/top").get(getTopMovie);
router.route("/top-selling").get(getTopSellingMovie);

router.route("/:id").get(getMovie).put(updateMovie).delete(deleteMovie);

module.exports = router;
