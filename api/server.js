const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/usersRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
