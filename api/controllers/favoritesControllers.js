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
    var query = `
        SELECT
        f.favorites_id,
        f.user_id,
        f.created_at,
        f.isStillMarked,
        'app' AS favorite_type,
      a.rating AS rating,
      a.media AS favorite_media,
        a.app_id AS favorite_id,
        a.app_name AS favorite_name,
        a.category AS favorite_category,
        a.developer AS favorite_developer,
        a.description AS favorite_description,
        a.price AS favorite_price
    FROM
        favorites f
    JOIN
        apps a ON f.app_id = a.app_id
    WHERE
    f.user_id = ${id}

    UNION

    SELECT
        f.favorites_id,
        f.user_id,
        f.created_at,
        f.isStillMarked,
        'game' AS favorite_type,
      g.rating AS rating,
      g.media AS favorite_media,
        g.game_id AS favorite_id,
        g.game_name AS favorite_name,
        g.category AS favorite_category,
        g.developer AS favorite_developer,
        g.description AS favorite_description,
        g.price AS favorite_price
    FROM
        favorites f
    JOIN
        games g ON f.game_id = g.game_id
    WHERE
    f.user_id = ${id}

    UNION

    SELECT
        f.favorites_id,
        f.user_id,
        f.created_at,
        f.isStillMarked,
        'movie' AS favorite_type,
      m.rating AS rating,
      m.media AS favorite_media,
        m.movie_id AS favorite_id,
        m.movie_name AS favorite_name,
        m.category AS favorite_category,
        m.director AS favorite_developer,
        m.description AS favorite_description,
        m.price AS favorite_price
    FROM
        favorites f
    JOIN
        movies m ON f.movie_id = m.movie_id
    WHERE
        f.user_id = ${id}

    UNION

    SELECT
        f.favorites_id,
        f.user_id,
        f.created_at,
        f.isStillMarked,
        'book' AS favorite_type,
      b.rating AS rating,
      b.media AS favorite_media,
        b.book_id AS favorite_id,
        b.name AS favorite_name,
        b.category AS favorite_category,
        b.author AS favorite_developer,
        b.description AS favorite_description,
        b.price AS favorite_price
    FROM
        favorites f
    JOIN
        books b ON f.book_id = b.book_id
    WHERE
    f.user_id = ${id};
    `;
    const favorite = await pool.query(query);
    res.json(favorite.rows);
  } catch (err) {
    console.error({ success: false, error: err.message });

    res.status(500).send("Server error");
  }
};

const addFavorite = async (req, res) => {
  try {
    const { userId, id, type } = req.body;

    if (type === "book") {
      await pool.query(
        "INSERT INTO favorites (user_id, book_id) VALUES ($1, $2)",
        [userId, id]
      );
    } else if (type === "movie") {
      await pool.query(
        "INSERT INTO favorites (user_id, movie_id) VALUES ($1, $2)",
        [userId, id]
      );
    } else if (type === "app") {
      await pool.query(
        "INSERT INTO favorites (user_id, app_id) VALUES ($1, $2)",
        [userId, id]
      );
    } else if (type === "game") {
      await pool.query(
        "INSERT INTO favorites (user_id, game_id) VALUES ($1, $2)",
        [userId, id]
      );
    }

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
