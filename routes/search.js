const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "https://REFKA-GUENICHI:hyfI6foJhJlpjgkgP1xO@localhost:9200",
});
client
  .info()
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

});

module.exports = router;