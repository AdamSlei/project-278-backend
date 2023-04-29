const { Client } = require("pg");

const connectionString =
  "postgres://dnznfzkm:ETeunswcjN1LlifqzIBbyG35eM52bbUe@tiny.db.elephantsql.com/dnznfzkm";

const client = new Client({
  connectionString: connectionString,
});

client.connect();

const categories = [
  "Action & Adventure",
  "Animation",
  "Comedy",
  "Documentary",
  "History",
];

const updateCategories = async () => {
  try {
    // Fetch all rows from the movies table
    const res = await client.query("SELECT movie_id FROM movies");

    // Update the category column with random values from the list
    for (const row of res.rows) {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      await client.query(
        "UPDATE movies SET category = $1 WHERE movie_id = $2",
        [randomCategory, row.movie_id]
      );
    }

    console.log("Category column updated with random values from the list.");
  } catch (error) {
    console.error("Error: ", error.message);
  } finally {
    await client.end();
  }
};

updateCategories();
