const Job = require("../db/models/Job");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { createJob, updateJob } = require("../db/services/Job");


exports.postJob = async (req, res) => {
  try {
    newJob = await createJob(req.body).then(function (val) {
      console.log('valllll', val)
      return val;
    });
    res.json(newJob);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const Jobs = await Job.query();
    res.json(Jobs);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

exports.getOneJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.query()
      .findById(id)
      // .withGraphFetched("company");
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

exports.editJob = async (req, res) => {
  try {
    const { id } = req.params;
    const exist = await Job.query().findById(id);
    if(exist){
    const job = await updateJob(req.body);
    res.json(job);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await Job.query().deleteById(id);
    res.json({ msg: "Job was deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};
