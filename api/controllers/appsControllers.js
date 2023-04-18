const pool = require("../config/db");

const getApps = async (req, res) => {
  try {
    const allApps = await pool.query("SELECT * FROM apps");
    res.json(allApps.rows);
  } catch (err) {
       console.error({ success: false, error: err.message });

  }
};

const getApp = async (req, res) => {
  try {
    const { id } = req.params;
    const app = await pool.query("SELECT * FROM apps WHERE app_id = $1", [
      id,
    ]);
    res.json(app.rows);
  } catch (err) {
       console.error({ success: false, error: err.message });

  }
};

const addApp = async (req, res) => {
  try {
    const { name, description, developer_id } = req.body;

    await pool.query(
      "INSERT INTO apps (name, description, developer_id) VALUES ($1 , $2 , $3)",
      [name, description, developer_id]
    );
    res.json("App was added!");
  } catch (err) {
       console.error({ success: false, error: err.message });

  }
};

const updateApp = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, description, developer_id } = req.body;
    await pool.query(
      "UPDATE apps SET name = $1 , description = $2 , developer_id = $3 WHERE app_id = $4",
      [name, description, developer_id, id]
    );

    res.json(`App with id = ${id} was updated!`);
  } catch (err) {
       console.error({ success: false, error: err.message });

  }
};

const deleteApp = async (req, res) => {
  try {
    const { id } = req.query;
    await pool.query("DELETE FROM apps WHERE app_id = $1", [id]);
    res.json(`App with id = ${id} was deleted!`);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getApps,
  getApp,
  addApp,
  updateApp,
  deleteApp,
};
