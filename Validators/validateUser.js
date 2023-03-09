function validateEmail(email) {
  const emailPattern =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (email === "") {
    return {
      isInvalid: true,
      message: "Please provide username",
    };
  } else if (!emailPattern.test(email)) {
    return {
      isInvalid: true,
      message: "Please provide valid username",
    };
  } else {
    return {
      isInvalid: false,
      message: "",
    };
  }
}

function validatePassword(password) {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;

  if (password === "") {
    return {
      isInvalid: true,
      message: "Please provide a password",
    };
  } else if (!passwordPattern.test(password)) {
    return {
      isInvalid: true,
      message: "Please provide a valid password",
    };
  } else {
    return {
      isInvalid: false,
      message: "",
    };
  }
}

module.exports = { validateEmail, validatePassword };
