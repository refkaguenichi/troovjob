const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const User = require("../db/models/User");
const { createUser } = require("../db/services/user");

exports.register = async (req, res) => {
  try {
    let id;
    const { userName, password, confirmPassword } = req.body;

    var hashedPassword = await bcrypt.hashSync(password, saltRounds);
    const exist = await User.query().where("user_name", userName).first();
    if (!exist && (password === confirmPassword)) {
      id = await createUser({ userName, hashedPassword }).then(function (val) {
        return val;
      });
    } else if (password !== confirmPassword) {
      res.status(400).send({
        msg: "Passwords do not match!",
      });
    } else {
      res.status(400).send({
        msg: "This username is already exist please try with another one",
      });
    }
    if (id) {
      const token = await jwt.sign(
      {
        id: id,
      },
        process.env.SECRET_KEY,
        { expiresIn: "3 days" }
      );
      res.status(200).send({ ...id, userName, password: hashedPassword, token });
          }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    let comparePass;
    const { userName, password } = req.body;
    const exist = await User.query().findOne({ user_name: userName });
    if (exist) {
      comparePass = await bcrypt.compare(password, exist.password);
      if (comparePass) {
        const token = await jwt.sign(
          {
            id: exist.id,
          },
          process.env.SECRET_KEY,
          { expiresIn: "3 days" }
        );
        res.status(200).send({ ...exist, token });
      } else {
        res.status(400).send({
          msg: "Bad credentials!",
        });
      }
    } else {
      res.status(400).send({
        msg: "Bad credentials!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};
