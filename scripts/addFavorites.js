const { Pool } = require("pg");
const { faker } = require("@faker-js/faker");

const connectionString = 'postgres://dnznfzkm:ETeunswcjN1LlifqzIBbyG35eM52bbUe@tiny.db.elephantsql.com/dnznfzkm';
const pool = new Pool({ connectionString });

function getRandomType() {
  const types = ['app_id', 'game_id', 'movie_id', 'book_id'];
  const index = Math.floor(Math.random() * types.length);
  return types[index];
}

async function addRandomFavorite() {
  const favoriteType = getRandomType();
  const favorite = {
    app_id: null,
    game_id: null,
    movie_id: null,
    book_id: null,
    user_id: Math.floor(Math.random() * 75) + 1,
    isStillMarked: Math.random() >= 0.5,
  };

  favorite[favoriteType] = Math.floor(Math.random() * 40) + 1;

  const query = `
    INSERT INTO favorites (app_id, game_id, movie_id, book_id, user_id, isStillMarked)
    VALUES ($1, $2, $3, $4, $5, $6);
  `;

  await pool.query(query, [favorite.app_id, favorite.game_id, favorite.movie_id, favorite.book_id, favorite.user_id, favorite.isStillMarked]);
}

(async () => {
  for (let i = 0; i < 100; i++) {
    await addRandomFavorite();
  }
  console.log('100 random favorites added to the database.');

  await pool.end();
})();
