const axios = require("axios");
const { Pool } = require("pg");

var connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`;

const pool = new Pool({ connectionString });

async function fetchApps() {
  try {
    const response = await axios.get(
      "https://serpapi.com/search.json?engine=google_play&store=apps&api_key=db20b171d4cfd8f5df0ec14a94d81ea187102cd82bf37a34316d5280bd3fe51a"
    );

    console.log(response.data.organic_results);
    const apps = response.data.organic_results;
    return apps;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

async function storeApp(app) {
  try {
    const {
      title,
      category,
      developer,
      description,
      price,
      media,
      is_top_selling,
      is_top_grossing,
      is_top_paid,
    } = app;

    await pool.query(
      `INSERT INTO apps (app_name, category, developer, description, price, media, isTopSelling, isTopGrossing, isTopPaid)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        title,
        category,
        developer,
        description,
        price,
        media[0],
        is_top_selling,
        is_top_grossing,
        is_top_paid,
      ]
    );

    console.log(`Stored app: ${title}`);
  } catch (error) {
    console.error(`Error storing app: ${error}`);
  }
}

(async () => {
  const apps = await fetchApps();

  //   if (apps && apps.length > 0) {
  //     for (const app of apps) {
  //       await storeApp(app);
  //     }
  //     console.log("All apps stored");
  //   } else {
  //     console.log("No apps to store");
  //   }

  console.log(apps);
  await pool.end();
})();
