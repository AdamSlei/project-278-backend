const pool = require("../config/db");

const getFavorites = async (req, res) => {
  try {
    const { userId } = req.query;
    const favorites = await pool.query(
      "SELECT * FROM favorites WHERE user_id = $1",
      [userId]
    );
    res.json(favorites.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const addFavorite = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    await pool.query(
      "INSERT INTO favorites (user_id, book_id) VALUES ($1, $2)",
      [userId, bookId]
    );
    res.json("Favorite added successfully!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.query;
    await pool.query("DELETE FROM favorites WHERE favorite_id = $1", [
      favoriteId,
    ]);
    res.json("Favorite deleted successfully!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  deleteFavorite,
};
