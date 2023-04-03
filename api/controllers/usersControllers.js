const pool = require("../config/db");

const getUsers = async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM USERS");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await pool.query("SELECT * FROM USERS WHERE user_id = $1", [
      id,
    ]);
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const addUser = async (req, res) => {
  try {
    const { username, password, email, profile_picture } = req.body;

    await pool.query(
      "INSERT INTO USERS (username, password, email, profile_picture) VALUES ($1 , $2  ,$3 , $4)",
      [username, password, email, profile_picture]
    );
    res.json("FREELANCER was Added!");
  } catch (err) {
    console.error(err.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.query;
    const { username, password, email, profile_picture } = req.body;
    await pool.query(
      "UPDATE USERS SET username = $1 , password = $2 , email = $3 , profile_picture = $4 WHERE userID = $5",
      [username, password, email, profile_picture, id]
    );

    res.json(`User with id = ${id} was updated!`);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    await pool.query("DELETE FROM USERS WHERE user_id = $1", [id]);
    res.json(`User with id = ${id} was deleted!`);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};