const { Client } = require("pg");

const connectionString =
  "postgres://dnznfzkm:ETeunswcjN1LlifqzIBbyG35eM52bbUe@tiny.db.elephantsql.com/dnznfzkm";

const client = new Client({
  connectionString: connectionString,
});

client.connect();

const categories = [
  "Travel",
  "Messaging",
  "Productivity",
  "Premium",
  "Recommended",
];

const updateCategories = async () => {
  try {
    // Fetch all rows from the apps table
    const res = await client.query("SELECT app_id FROM apps");

    // Update the category column with random values from the list
    for (const row of res.rows) {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      await client.query("UPDATE apps SET category = $1 WHERE app_id = $2", [
        randomCategory,
        row.app_id,
      ]);
    }

    console.log("Category column updated with random values from the list.");
  } catch (error) {
    console.error("Error: ", error.message);
  } finally {
    await client.end();
  }
};

updateCategories();
