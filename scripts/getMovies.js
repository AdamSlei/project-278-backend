const axios = require("axios");
const { Pool } = require("pg");

async function fetchMovies() {
  try {
    const response = await axios.get(
      "https://serpapi.com/search.json?engine=google_play&store=movies&api_key=db20b171d4cfd8f5df0ec14a94d81ea187102cd82bf37a34316d5280bd3fe51a"
    );

    const movies = response.data.organic_results;
    return movies;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

async function storeMovie(movie, pool) {
  try {
    const { title, product_id, thumbnail, price, extracted_price } = movie;
    console.log(movie);

    await pool.query(
      `INSERT INTO movies (movie_name, category, director, description, price, media, isTopMovie, isTopSelling)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        title,
        "Unknown",
        product_id,
        "Unknown",
        extracted_price,
        thumbnail,
        false,
        false,
      ]
    );

    console.log(`Stored movie: ${title}`);
  } catch (error) {
    console.error(`Error storing movie: ${error}`);
  }
}

(async () => {
  try {
    const movies = await fetchMovies();

    if (movies && movies.length > 0) {
      const connectionString =
        "postgres://dnznfzkm:ETeunswcjN1LlifqzIBbyG35eM52bbUe@tiny.db.elephantsql.com/dnznfzkm";
      const pool = new Pool({ connectionString });

      for (let i = 0; i < movies.length; i++) {
        for (const movie of movies[i].items) {
          await storeMovie(movie, pool);
        }
      }
      await pool.end();

      console.log("All movies stored");
    } else {
      console.log("No movies to store");
    }
  } catch (error) {
    console.error(`Error in main execution: ${error}`);
  }
})();
