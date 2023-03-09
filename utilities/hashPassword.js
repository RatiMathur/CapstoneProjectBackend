/*To encrypt the password while saving in database*/
async function getHashedPassword(password) {
  const bcrypt = require("bcrypt");
  password = await bcrypt.hash(password, 10);
  return password;
}

/*To validate user is authenticate we generate a token */
function generateToken({ userName }) {
  console.log("token 1");
  const { sign } = require("jsonwebtoken");
  let payload = { userName: userName };
  const token = sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
}

module.exports = { getHashedPassword, generateToken };
