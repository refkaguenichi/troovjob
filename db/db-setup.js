const knex = require("knex");
const knexfile = require("./knexfile");
const { Model } = require("objection");

  const db = knex(knexfile.development);
  // plug db config into objection
  Model.knex(db);
module.exports = db;
