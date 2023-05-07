const pool = require("../config/db");

const getReviews = async (req, res) => {
  try {
    const allReviews = await pool.query("SELECT * FROM reviews");
    res.status(200).json({ success: true, payload: allReviews.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

const getReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await pool.query(
      "SELECT * FROM reviews WHERE user_id = $1 LIMIT 1",
      [id]
    );
    res.status(200).json({ success: true, payload: review.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

const addReview = async (req, res) => {
  try {
    const { title, body, rating, user_id, movie_id } = req.body;

    const newReview = await pool.query(
      "INSERT INTO reviews (title, body, rating, user_id, movie_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, body, rating, user_id, movie_id]
    );
    res.status(201).json({ success: true, payload: newReview.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, rating, user_id, movie_id } = req.body;
    const updatedReview = await pool.query(
      "UPDATE reviews SET title = $1, body = $2, rating = $3, user_id = $4, movie_id = $5 WHERE review_id = $6 RETURNING *",
      [title, body, rating, user_id, movie_id, id]
    );
    res.status(200).json({ success: true, payload: updatedReview.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await pool.query(
      "DELETE FROM reviews WHERE review_id = $1 RETURNING *",
      [id]
    );
    res.status(200).json({ success: true, payload: deletedReview.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
};
