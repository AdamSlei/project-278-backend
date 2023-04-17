const pool = require("../config/db");

// Get all books
const getBooks = async (req, res) => {
  try {
    const allBooks = await pool.query("SELECT * FROM books");
    res.json(allBooks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
};

// Get a specific book by ID
const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await pool.query("SELECT * FROM books WHERE book_id = $1", [
      id,
    ]);
    if (book.rows.length === 0) {
      return res.status(404).json("Book not found");
    }
    res.json(book.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
};

// Add a new book
const addBook = async (req, res) => {
  try {
    const { title, author, description, price, image_url } = req.body;
    await pool.query(
      "INSERT INTO books (title, author, description, price, image_url) VALUES ($1, $2, $3, $4, $5)",
      [title, author, description, price, image_url]
    );
    res.json("Book was added!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
};

// Update an existing book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description, price, image_url } = req.body;
    const result = await pool.query(
      "UPDATE books SET title = $1, author = $2, description = $3, price = $4, image_url = $5 WHERE book_id = $6 RETURNING *",
      [title, author, description, price, image_url, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json("Book not found");
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM books WHERE book_id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json("Book not found");
    }
    res.json(`Book with ID ${id} was deleted!`);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
};

module.exports = { getBooks, getBook, addBook, updateBook, deleteBook };
