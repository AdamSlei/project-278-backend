const pool = require("../config/db");

const getGames = async (req, res) => {
  try {
    const allGames = await pool.query(`
            SELECT game_id,
              game_name AS name,
              category,
              developer,
              description,
              price,
              created_at,
              media,
              istopselling,
              istopgrossing,
              istoppaid,
              ispopular,
              rating
        FROM games
        ORDER BY game_id
    `);
    res.json(allGames.rows);
  } catch (err) {
    console.error({ success: false, error: err.message });
  }
};

const getGame = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await pool.query("SELECT * FROM games WHERE game_id = $1", [
      id,
    ]);
    res.json(game.rows[0]);
  } catch (err) {
    console.error({ success: false, error: err.message });
  }
};

const addGame = async (req, res) => {
  try {
    const { name, genre, release_year } = req.body;
    await pool.query(
      "INSERT INTO games (name, genre, release_year) VALUES ($1 , $2  ,$3)",
      [name, genre, release_year]
    );
    res.json("Game was added to the database!");
  } catch (err) {
    console.error({ success: false, error: err.message });
  }
};

const updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, genre, release_year } = req.body;
    await pool.query(
      "UPDATE games SET name = $1 , genre = $2 , release_year = $3 WHERE game_id = $4",
      [name, genre, release_year, id]
    );
    res.json(`Game with id = ${id} was updated!`);
  } catch (err) {
    console.error({ success: false, error: err.message });
  }
};

const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM games WHERE game_id = $1", [id]);
    res.json(`Game with id = ${id} was deleted from the database!`);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getGames,
  getGame,
  addGame,
  updateGame,
  deleteGame,
};
