const axios = require("axios");
const { Pool } = require("pg");

async function fetchGames() {
  try {
    const response = await axios.get(
      "https://serpapi.com/search.json?engine=google_play&store=games&api_key=db20b171d4cfd8f5df0ec14a94d81ea187102cd82bf37a34316d5280bd3fe51a"
    );

    const games = response.data.organic_results;
    return games;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

async function storeGame(game, pool) {
  try {
    const { title, product_id, thumbnail, category, developer } = game;
    console.log(game);

    await pool.query(
      `INSERT INTO games (game_name, category, developer, description, price, media, isTopSelling, isTopGrossing, isTopPaid, isPopular)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        title,
        category,
        product_id,
        "Unknown",
        0,
        thumbnail,
        false,
        false,
        false,
        false,
      ]
    );

    console.log(`Stored game: ${title}`);
  } catch (error) {
    console.error(`Error storing game: ${error}`);
  }
}

(async () => {
  try {
    const games = await fetchGames();

    if (games && games.length > 0) {
      const connectionString =
        "postgres://dnznfzkm:ETeunswcjN1LlifqzIBbyG35eM52bbUe@tiny.db.elephantsql.com/dnznfzkm";
      const pool = new Pool({ connectionString });
      for (let i = 0; i < games.length; i++) {
        for (const game of games[i].items) {
          await storeGame(game, pool);
        }
      }
      await pool.end();

      console.log("All games stored");
    } else {
      console.log("No games to store");
    }
  } catch (error) {
    console.error(`Error in main execution: ${error}`);
  }
})();
