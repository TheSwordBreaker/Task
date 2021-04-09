const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    mobileNumber: {
      type: String,
      trim: true,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

User.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("User", User);
