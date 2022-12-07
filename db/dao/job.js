const db = require("../db-setup");

class JobDAO {
  async createJob({...job}) {
    const [id] = await db("users")
      .insert({
   ...job
      })
      .returning("id");

    return id;
  }
}

module.exports = new JobDAO();
