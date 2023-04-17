const { Client } = require("pg");
const { faker } = require("@faker-js/faker");

const connectionString =
  "postgres://dnznfzkm:ETeunswcjN1LlifqzIBbyG35eM52bbUe@tiny.db.elephantsql.com/dnznfzkm";

const client = new Client({ connectionString });

(async () => {
  try {
    await client.connect();

    const numUsers = 55; // Change this value to control how many users you want to insert.

    for (let i = 0; i < numUsers; i++) {
      const username = faker.internet.userName();
      const password = faker.internet.password();
      const email = faker.internet.email();
      const profilePicture = faker.internet.avatar();

      const insertQuery = `
        INSERT INTO users (username, password, email, profile_picture)
        VALUES ($1, $2, $3, $4);
      `;

      await client.query(insertQuery, [
        username,
        password,
        email,
        profilePicture,
      ]);
      console.log(`User ${i + 1} inserted: ${username}`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
})();
