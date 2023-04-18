const { Client } = require("pg");

const connectionString =
  "postgres://dnznfzkm:ETeunswcjN1LlifqzIBbyG35eM52bbUe@tiny.db.elephantsql.com/dnznfzkm";

const client = new Client({
  connectionString,
});

async function updateAppsWithRandomFlags() {
  await client.connect();

  const { rows: apps } = await client.query("SELECT app_id FROM apps");

  for (const app of apps) {
    const isTopSelling = Math.random() > 0.5;
    const isTopGrossing = Math.random() > 0.5;
    const isTopPaid = Math.random() > 0.5;

    await client.query(
      "UPDATE apps SET isTopSelling = $1, isTopGrossing = $2, isTopPaid = $3 WHERE app_id = $4",
      [isTopSelling, isTopGrossing, isTopPaid, app.app_id]
    );
  }

  await client.end();
}

updateAppsWithRandomFlags().catch((error) => {
  console.error(error);
  process.exit(1);
});
