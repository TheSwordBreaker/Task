const { user } = require("./schema");
const { error } = require("../utlis/api");

module.exports = {
  addUserValidation: () => async (req, res, next) => {
    try {
      const value = await user.validate(req.body);
      if (value.error) {
        console.log(value);
        return error(res, value.error.details[0].message);
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      console.log("error");
    }
  },
};
