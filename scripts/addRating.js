const { Client } = require("pg");

const connectionString =
  "postgres://dnznfzkm:ETeunswcjN1LlifqzIBbyG35eM52bbUe@tiny.db.elephantsql.com/dnznfzkm";

const client = new Client({
  connectionString: connectionString,
});

client.connect();

const addRatingColumn = async () => {
  try {
    // Add rating column
    await client.query("ALTER TABLE apps ADD COLUMN rating DECIMAL(3, 2)");

    // Fetch all rows from the apps table
    const res = await client.query("SELECT app_id FROM apps");

    // Update the rating column with random values between 0 and 5
    for (const row of res.rows) {
      const randomRating = parseFloat((Math.random() * 5).toFixed(2));
      await client.query("UPDATE apps SET rating = $1 WHERE app_id = $2", [
        randomRating,
        row.app_id,
      ]);
    }

    console.log("Rating column added and updated with random values.");
  } catch (error) {
    console.error("Error: ", error.message);
  } finally {
    await client.end();
  }
};

addRatingColumn();
