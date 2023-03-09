// Validae the token of user and display corresponding books
const jwt = require("jsonwebtoken");

const tokenValidator = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (verify) {
      next(); //if verified call the next middleware
    } else return res.status(401).send({ error: "Authentication failed" });
  } catch (error) {
    return res.status(401).send({ error: "Authentication failed" });
  }
};

module.exports = { tokenValidator };
