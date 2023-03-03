/*Creating authentication APIs*/
const authenticateRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const {
  getHashedPassword,
  generateToken,
} = require("../utilities/hashPassword");

//Create new User
authenticateRouter.post("/signup", async (req, res) => {
  let { userName, password } = req.body;

  const userEntity = new User({
    userName: userName,
    password: await getHashedPassword(password),
  });
  try {
    await userEntity.save(); //saves the user data and its a promise
    const token = generateToken(userEntity);
    res.json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Login with existing username
authenticateRouter.post("/login", async (req, res) => {
  let { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName: userName });
    const passwordIsSame = await bcrypt.compare(password, user?.password);

    if (!user || !passwordIsSame) {
      res.status(400).json({
        error: "Username and password is incorrect",
      });
    } else {
      const token = generateToken(user);
      res.json({ token });
    }
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

module.exports = { authenticateRouter };
