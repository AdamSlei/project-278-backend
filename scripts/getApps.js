// const axios = require("axios");
// const { Pool } = require("pg");

// async function fetchApps() {
//   try {
//     const response = await axios.get(
//       "https://serpapi.com/search.json?engine=google_play&store=apps&api_key=db20b171d4cfd8f5df0ec14a94d81ea187102cd82bf37a34316d5280bd3fe51a"
//     );

//     const apps = response.data.organic_results;
//     return apps;
//   } catch (error) {
//     console.error(`Error fetching data: ${error}`);
//   }
// }

// async function storeApp(app) {
//   try {
//     var connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`;

//     const pool = new Pool({ connectionString });

//     const { title, product_id, thumbnail } = app;

//     await pool.query(
//       `INSERT INTO apps (app_name, category, developer, description, price, media, isTopSelling, isTopGrossing, isTopPaid)
//        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
//       [
//         title,
//         "Unknown", // Since the API doesn't provide the category, set it as 'Unknown'
//         product_id, // Since the API doesn't provide the developer, set it as 'Unknown'
//         "Unknown", // Since the API doesn't provide the description, set it as 'Unknown'
//         0, // Since the API doesn't provide the price, set it to 0
//         thumbnail,
//         false, // Since the API doesn't provide the isTopSelling status, set it to false
//         false, // Since the API doesn't provide the isTopGrossing status, set it to false
//         false, // Since the API doesn't provide the isTopPaid status, set it to false
//       ]
//     );

//     console.log(`Stored app: ${title}`);
//     await pool.end();
//   } catch (error) {
//     console.error(`Error storing app: ${error}`);
//   }
// }

// (async () => {
//   const apps = await fetchApps();

//   console.log(apps[0]);

//   if (apps && apps.length > 0) {
//     for (const app of apps) {
//       await storeApp(app);
//     }
//     console.log("All apps stored");
//   } else {
//     console.log("No apps to store");
//   }
// })();

const axios = require("axios");
const { Pool } = require("pg");

async function fetchApps() {
  try {
    const response = await axios.get(
      "https://serpapi.com/search.json?engine=google_play&store=apps&api_key=db20b171d4cfd8f5df0ec14a94d81ea187102cd82bf37a34316d5280bd3fe51a"
    );

    const apps = response.data.organic_results;
    return apps;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

async function storeApp(app, pool) {
  try {
    const { title, product_id, thumbnail } = app;
    console.log(app);

    await pool.query(
      `INSERT INTO apps (app_name, category, developer, description, price, media, isTopSelling, isTopGrossing, isTopPaid)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        title,
        "Unknown",
        product_id,
        "Unknown",
        0,
        thumbnail,
        false,
        false,
        false,
      ]
    );



    console.log(`Stored app: ${title}`);
  } catch (error) {
    console.error(`Error storing app: ${error}`);
  }
}

(async () => {
  try {
    const apps = await fetchApps();

    // console.log(apps[0].items);

    // for (let i = 0; i < apps.length; i++) {
    //   console.log(i);
    // }

    if (apps && apps.length > 0) {
      const connectionString = `postgres://dnznfzkm:ETeunswcjN1LlifqzIBbyG35eM52bbUe@tiny.db.elephantsql.com/dnznfzkm`;
      const pool = new Pool({ connectionString });
      for (let i = 0; i < apps.length; i++) {
        for (const app of apps[i].items) {
          // console.log(app);
          await storeApp(app, pool);
        }
      }
      await pool.end();


      console.log("All apps stored");
    } else {
      console.log("No apps to store");
    }
  } catch (error) {
    console.error(`Error in main execution: ${error}`);
  }
})();
