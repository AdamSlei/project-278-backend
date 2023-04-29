const { Client } = require("pg");

const connectionString =
  "postgres://dnznfzkm:ETeunswcjN1LlifqzIBbyG35eM52bbUe@tiny.db.elephantsql.com/dnznfzkm";

const client = new Client({
  connectionString,
});

async function updateAppsWithRandomFlags() {
  await client.connect();

  const { rows: movies } = await client.query("SELECT movie_id FROM movies");

  for (const movie of movies) {
    const isTopSelling = Math.random() > 0.5;
    const isTopMovie = Math.random() > 0.5;

    await client.query(
      "UPDATE movies SET istopselling = $1, istopmovie = $2 WHERE movie_id = $3",
      [isTopSelling, isTopMovie, movie.movie_id]
    );
  }

  await client.end();
}

updateAppsWithRandomFlags().catch((error) => {
  console.error(error);
  process.exit(1);
});
