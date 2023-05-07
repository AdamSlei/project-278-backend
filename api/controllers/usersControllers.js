const pool = require("../config/db");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM USERS");
    res.status(200).json({ success: true, payload: allUsers.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await pool.query(
      "SELECT username, profile_picture FROM USERS WHERE email = $1",
      [email]
    );
    res.status(200).json({ success: true, payload: user.rows[0] ?? "User not found" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

const addUser = async (req, res) => {
  try {
    const { username, password, email, profile_picture } = req.body;

    await pool.query(
      "INSERT INTO USERS (username, password, email, profile_picture) VALUES ($1, $2, $3, $4)",
      [username, password, email, profile_picture]
    );
    res
      .status(201)
      .json({ success: true, message: `User ${username} was added!` });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email, profile_picture } = req.body;
    await pool.query(
      "UPDATE USERS SET username = $1, password = $2, email = $3, profile_picture = $4 WHERE user_id = $5",
      [username, password, email, profile_picture, id]
    );

    res
      .status(200)
      .json({ success: true, message: `User ${username} was updated!` });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM USERS WHERE user_id = $1", [id]);
    res
      .status(200)
      .json({ success: true, message: `User with id = ${id} was deleted!` });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
