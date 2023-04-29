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
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM USERS WHERE user_id = $1", [
      id,
    ]);
    res.status(200).json({ success: true, payload: user.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await pool.query("SELECT * FROM USERS WHERE username = $1", [
      username,
    ]);

    if (user.rows.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    }

    res.status(200).json({ success: true, payload: user.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, password, email, profile_picture } = req.body;

    // Check if the username or email already exists
    const existingUser = await pool.query(
      "SELECT * FROM USERS WHERE username = $1 OR email = $2",
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Username or email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user into the database
    await pool.query(
      "INSERT INTO USERS (username, password, email, profile_picture) VALUES ($1, $2, $3, $4)",
      [username, hashedPassword, email, profile_picture]
    );
    res
      .status(201)
      .json({ success: true, message: `User ${username} was registered!` });
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
