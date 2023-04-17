const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/apps", require("./routes/appsRoutes"));
app.use("/api/books", require("./routes/booksRoutes"));
app.use("/api/games", require("./routes/gamesRoutes"));
app.use("/api/movies", require("./routes/moviesRoutes"));
app.use("/api/reviews", require("./routes/reviewsRoutes"));
app.use("/api/favorites", require("./routes/favoritesRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
