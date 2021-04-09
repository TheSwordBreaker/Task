const { MinKey } = require("bson");
const joi = require("joi");

const schema = {
  // Id, Name, mobile number, age.
  user: joi.object({
    name: joi.string().min(4).max(100).required(),
    mobileNumber: joi
      .string()
      .regex(/^[0-9]{10}$/)
      .message("Mobile Number Should be 10 digit long.")
      .required(),
    age: joi.number().min(1).max(100).required(),
  }),
};

module.exports = schema;
