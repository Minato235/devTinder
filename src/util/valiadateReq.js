const validator = require("validator");

const validateReq = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  const errors = [];

  if (!firstName) {
    errors.push("First name is required.");
  }
  if (!lastName) {
    errors.push("Last name is required.");
  }
  if (!emailId) {
    errors.push("Email is required.");
  } else if (!validator.isEmail(emailId)) {
    errors.push("Email is not valid.");
  }
  if (!password) {
    errors.push("Password is required.");
  } else if (!validator.isStrongPassword(password)) {
    errors.push("Password is not strong enough. It should contain at least 8 characters, including uppercase, lowercase, numbers, and symbols.");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(" "));
  }
};

module.exports = { validateReq };
