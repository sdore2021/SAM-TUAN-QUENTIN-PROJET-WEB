const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Joi = require("joi");

let UserAdmSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});

UserAdmSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, name: this.name },
    "jwtPrivateKey" //config.get("jwtPrivateKey")
  );

  return token;
};

function validateUserAdmin(userAdm) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  };
  return Joi.validate(userAdm, schema);
}

module.exports.UserAdm = mongoose.model("UserAdm", UserAdmSchema);
module.exports.validate = validateUserAdmin;
