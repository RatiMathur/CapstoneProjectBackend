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

userSchema.pre("save", function (next) {
  let currentDatTime = Date.now();
  this.updatedAt = currentDatTime;

  if (!this.createdAt) {
    this.createdAt = currentDatTime;
  }

  next();
});

userSchema.post("save", function (doc) {
  this.password = "";
  console.log(`Update done with empty password.`);
});

module.exports = model("User", userSchema);
