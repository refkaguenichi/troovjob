const User = require("../db/models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { updateUser } = require("../db/services/user");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.query();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.query()
      .findById(id)
      .withGraphFetched("role")
      .withGraphFetched("jobseeker")
      .withGraphFetched("company");
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

exports.editUser = async (req, res) => {
  try {
    let comparePass;
    let hashedPassword;
    const { id } = req.params;
    const { userName, oldpassword, newpassword } = req.body;
    const exist = await User.query().findById(id);
    if (oldpassword) {
      comparePass = await bcrypt.compare(oldpassword, exist.password);
    }

    if (comparePass) {
      let newPass;
      let newUserName;
      if (newpassword) {
        hashedPassword = await bcrypt.hashSync(newpassword, saltRounds);
        newPass = await updateUser({ password: hashedPassword });
      }
      if (userName) {
        newUserName = await updateUser({ userName }).then(function (val) {
          return val;
        });
      }
      if (newUserName || newPass) {
        res.status(200).send({
          msg: "user updated successfully",
          user: {
            ...exist,
            userName: userName ? userName : exist.userName,
            password: hashedPassword ? hashedPassword : exist.password,
          },
        });
      }
    } else {
      res.status(400).send({ msg: "Please verify your password!" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.query().deleteById(id);
    res.json({msg:'User was deleted successfully!'});
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};
