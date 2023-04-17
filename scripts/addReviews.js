const { Pool } = require("pg");
const { faker } = require("@faker-js/faker");

const connectionString =
  "postgres://dnznfzkm:ETeunswcjN1LlifqzIBbyG35eM52bbUe@tiny.db.elephantsql.com/dnznfzkm";
const pool = new Pool({ connectionString });

function getRandomType() {
  const types = ["app_id", "game_id", "movie_id", "book_id"];
  const index = Math.floor(Math.random() * types.length);
  return types[index];
}

async function addRandomReview() {
  const reviewType = getRandomType();
  const review = {
    app_id: null,
    game_id: null,
    movie_id: null,
    book_id: null,
    user_id: Math.floor(Math.random() * 75) + 1,
    rating: Math.floor(Math.random() * 5) + 1,
    comment: faker.lorem.sentences(),
  };

  review[reviewType] = Math.floor(Math.random() * 40) + 1;

  const query = `
    INSERT INTO reviews (app_id, game_id, movie_id, book_id, user_id, rating, comment)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;

  await pool.query(query, [
    review.app_id,
    review.game_id,
    review.movie_id,
    review.book_id,
    review.user_id,
    review.rating,
    review.comment,
  ]);
}

(async () => {
  for (let i = 0; i < 100; i++) {
    await addRandomReview();
  }
  console.log("100 random reviews added to the database.");

  await pool.end();
})();
