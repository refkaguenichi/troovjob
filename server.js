const express = require('express')
const app = express()
const setupDb = require("./db/db-setup");
const User = require("./db/models/User")

setupDb()
require("dotenv").config();
//Global middlware to read json type
app.use(express.json());

app.get('/users/:id', async(req, res)=>{
  try {
        const { id } = req.params;
        const user = await User.query().findById(id).withGraphFetched('profile');
        res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400).send(error)
  }
})
//port
PORT = process.env.PORT;
//start the server
app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});