const express = require('express')
const app = express()
require("dotenv").config();

//Global middlware to read json type
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/user"));
// app.use("/search", require("./routes/search"));

//port
PORT = process.env.PORT;

//start the server
app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});