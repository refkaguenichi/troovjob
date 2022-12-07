const db = require("../db-setup");
exports.createJob = async (jobDto) => {
  const [id] = await db("jobs").insert(jobDto).returning("id");
  return id;
};

exports.updateJob = async (jobDto) => {
  console.log("jobDto", jobDto);
  const [id] = await db("jobs").update(jobDto).returning("id");
  return id;
};
