const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  review: {
    type: Array,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

bookSchema.pre("save", function (next) {
  let currentDateTime = Date.now();
  this.updatedAt = currentDateTime;
  if (!this.createdAt) {
    this.createdAt = currentDateTime;
  }
  next();
});

module.exports = model("Book", bookSchema);
