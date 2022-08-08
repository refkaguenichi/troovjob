const db = require("../db-setup");

class UserDAO {
  async createUser(user_name, password) {
    const [id] = await db("users")
      .insert({
        user_name: user_name,
        password: password,
      })
      .returning("id");

    return id;
  }
}

module.exports = new UserDAO();
