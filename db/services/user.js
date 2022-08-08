const db = require("../db-setup");
exports.createUser = async (userDto) => {
  const { userName, hashedPassword } = userDto;
  const [id] = await db("users")
    .insert({
      user_name: userName,
      password: hashedPassword,
    })
    .returning("id");
  return id;
};


exports.updateUser = async (userDto) => {
  const { userName, password } = userDto;
  const [id] = await db("users")
    .update({
      user_name: userName,
      password: password,
    })
    .returning("id");
  return id;
};