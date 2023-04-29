const { Client } = require('pg');

const connectionString = 'postgres://dnznfzkm:ETeunswcjN1LlifqzIBbyG35eM52bbUe@tiny.db.elephantsql.com/dnznfzkm';

const client = new Client({
    connectionString: connectionString
});

client.connect();

const updatePrices = async () => {
    try {
        // Fetch all rows from the apps table
        const res = await client.query('SELECT app_id FROM apps');

        // Update the price column with random values between 0 and 50
        for (const row of res.rows) {
            const randomPrice = parseFloat((Math.random() * 10).toFixed(2));
            await client.query('UPDATE apps SET price = $1 WHERE app_id = $2', [randomPrice, row.app_id]);
        }

        console.log('Price column updated with random values.');
    } catch (error) {
        console.error('Error: ', error.message);
    } finally {
        await client.end();
    }
};

updatePrices();
