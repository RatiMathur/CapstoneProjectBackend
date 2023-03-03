const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: 1,
    validate: {
      validator: (value) => {
        const emailPattern =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return emailPattern.test(value);
      },
      message: (props) => `${props.value} is not a valid username`,
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = model("User", userSchema);
