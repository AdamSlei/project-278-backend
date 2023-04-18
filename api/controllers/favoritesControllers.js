const pool = require("../config/db");

const getFavorites = async (req, res) => {
  try {
    const favorites = await pool.query("SELECT * FROM favorites");
    res.json(favorites.rows);
  } catch (err) {
       console.error({ success: false, error: err.message });

    res.status(500).send("Server error");
  }
};

const getFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const favorite = await pool.query(
      "SELECT * FROM favorites WHERE user_id = $1 LIMIT 1",
      [id]
    );
    res.json(favorite.rows[0]);
  } catch (err) {
       console.error({ success: false, error: err.message });

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
       console.error({ success: false, error: err.message });

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
       console.error({ success: false, error: err.message });

    res.status(500).send("Server error");
  }
};

module.exports = {
  getFavorites,
  getFavorite,
  addFavorite,
  deleteFavorite,
};
