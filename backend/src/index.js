require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").Server(app);
const openai = require("openai");
const sass = require("sass");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const registerRouter = require("./routes/registerRoute");
const itinerariesRouter = require("./routes/itinerariesRoute");
const apiRoutes = require("./routes/api");
const saveRoute = require("./routes/saved");
const deleteRoute = require("./routes/delete");
const morgan = require("morgan");
const { Pool } = require("pg");

const db = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

db.connect();

// Express config
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api", apiRoutes);
app.use(authRoutes);
app.use("/register", registerRouter);
app.use("/itineraries", itinerariesRouter);
app.use("/itineraries", saveRoute(db));
app.use("/itineraries", deleteRoute(db));

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = db;
