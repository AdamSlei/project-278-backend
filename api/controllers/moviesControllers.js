const pool = require("../config/db");

const getMovies = async (req, res) => {
  try {
    const allMovies = await pool.query(
      "select movie_id , movie_name as name, category , director,description, description , price, created_at, media, istopmovie , istopselling , rating from movies"
    );
    res.json(allMovies.rows);
  } catch (err) {
    console.error({ success: false, error: err.message });

    res.status(500).json({ message: "Server Error" });
  }
};

const getActionMovie = async (req, res) => {
  try {
    const movie = await pool.query(
      "select movie_id , movie_name as name, category , director,description, description , price, created_at, media, istopmovie , istopselling from movies WHERE category = 'Action & Adventure' limit 10;"
    );
    if (movie.rows.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie.rows);
  } catch (err) {
    console.error({ success: false, error: err.message });

    res.status(500).json({ message: "Server Error" });
  }
};

const getAnimationMovie = async (req, res) => {
  try {
    const movie = await pool.query(
      "select movie_id , movie_name as name, category , director,description, description , price, created_at, media, istopmovie , istopselling FROM movies WHERE category = 'Animation' limit 10;"
    );
    if (movie.rows.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie.rows);
  } catch (err) {
    console.error({ success: false, error: err.message });

    res.status(500).json({ message: "Server Error" });
  }
};

const getComedyMovie = async (req, res) => {
  try {
    const movie = await pool.query(
      "select movie_id , movie_name as name, category , director,description, description , price, created_at, media, istopmovie , istopselling from movies WHERE category = 'Comedy' limit 10;"
    );
    if (movie.rows.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie.rows);
  } catch (err) {
    console.error({ success: false, error: err.message });

    res.status(500).json({ message: "Server Error" });
  }
};

const getDocumentaryMovie = async (req, res) => {
  try {
    const movie = await pool.query(
      "select movie_id , movie_name as name, category , director,description, description , price, created_at, media, istopmovie , istopselling from movies WHERE category = 'Documentary' limit 10;"
    );
    if (movie.rows.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie.rows);
  } catch (err) {
    console.error({ success: false, error: err.message });

    res.status(500).json({ message: "Server Error" });
  }
};

const getHistoryMovie = async (req, res) => {
  try {
    const movie = await pool.query(
      "select movie_id , movie_name as name, category , director,description, description , price, created_at, media, istopmovie , istopselling from movies WHERE category = 'History' limit 10;"
    );
    if (movie.rows.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie.rows);
  } catch (err) {
    console.error({ success: false, error: err.message });

    res.status(500).json({ message: "Server Error" });
  }
};

const getTopSellingMovie = async (req, res) => {
  try {
    const movie = await pool.query(
      "select movie_id , movie_name as name, category , director,description, description , price, created_at, media, istopmovie , istopselling from movies where istopselling = true limit 10;"
    );
    if (movie.rows.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie.rows);
  } catch (err) {
    console.error({ success: false, error: err.message });

    res.status(500).json({ message: "Server Error" });
  }
};
const getTopMovie = async (req, res) => {
  try {
    const movie = await pool.query(
      "select movie_id , movie_name as name, category , director,description, description , price, created_at, media, istopmovie , istopselling from where istopmovie = true limit 10;"
    );
    if (movie.rows.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie.rows);
  } catch (err) {
    console.error({ success: false, error: err.message });

    res.status(500).json({ message: "Server Error" });
  }
};

const getMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await pool.query(
      `
    select 
      movie_name as name,
      category,
      description,
      media,
      rating,
      price
     from MOVIES WHERE movie_id = $1`,
      [id]
    );
    if (movie.rows.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie.rows[0]);
  } catch (err) {
    console.error({ success: false, error: err.message });

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
    res.json({ success: true, message: "Movie created successfully" });
  } catch (err) {
    console.error({ success: false, error: err.message });

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
    res.json({ success: true, message: "Movie updated successfully" });
  } catch (err) {
    console.error({ success: false, error: err.message });
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
    res
      .status(200)
      .json({ success: true, message: "Movie deleted successfully" });
  } catch (err) {
    console.error({ success: false, error: err.message });

    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
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
};
