const pool = require("../config/db");

const getMovies = async (req, res) => {
  try {
    const allMovies = await pool.query("SELECT * FROM movies");
    res.json(allMovies.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await pool.query("SELECT * FROM movies WHERE id = $1", [id]);
    if (movie.rows.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const addMovie = async (req, res) => {
  try {
    const { title, director, year, rating } = req.body;

    await pool.query(
      "INSERT INTO movies (title, director, year, rating) VALUES ($1, $2, $3, $4)",
      [title, director, year, rating]
    );
    res.json({ message: "Movie created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, director, year, rating } = req.body;

    const movie = await pool.query("SELECT * FROM movies WHERE id = $1", [id]);
    if (movie.rows.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await pool.query(
      "UPDATE movies SET title = $1, director = $2, year = $3, rating = $4 WHERE id = $5",
      [title, director, year, rating, id]
    );
    res.json({ message: "Movie updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await pool.query("SELECT * FROM movies WHERE id = $1", [id]);
    if (movie.rows.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await pool.query("DELETE FROM movies WHERE id = $1", [id]);
    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
