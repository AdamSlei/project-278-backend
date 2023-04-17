const axios = require("axios");
const { Pool } = require("pg");

async function fetchBooks() {
  try {
    const response = await axios.get(
      "https://serpapi.com/search.json?engine=google_play&store=books&api_key=db20b171d4cfd8f5df0ec14a94d81ea187102cd82bf37a34316d5280bd3fe51a"
    );

    const books = response.data.organic_results;
    return books;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

async function storeBook(book, pool) {
  try {
    const { title, product_id, thumbnail, price, extracted_price } = book;

    await pool.query(
      `INSERT INTO books (book_name, category, author, description, price, media, isTopSelling, isDeal, isNewReleaseInFiction, isNewReleaseInNonFiction, isTopFree)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        title,
        "Unknown",
        "Unknown",
        "Unknown",
        extracted_price,
        thumbnail,
        false,
        false,
        false,
        false,
        false,
      ]
    );

    console.log(`Stored book: ${title}`);
  } catch (error) {
    console.error(`Error storing book: ${error}`);
  }
}

(async () => {
  try {
    const books = await fetchBooks();

    if (books && books.length > 0) {
      const connectionString =
        "postgres://dnznfzkm:ETeunswcjN1LlifqzIBbyG35eM52bbUe@tiny.db.elephantsql.com/dnznfzkm";
      const pool = new Pool({ connectionString });
      for (let i = 0; i < books.length; i++) {
        for (const book of books[i].items) {
          await storeBook(book, pool);
        }
      }
      await pool.end();

      console.log("All books stored");
    } else {
      console.log("No books to store");
    }
  } catch (error) {
    console.error(`Error in main execution: ${error}`);
  }
})();
