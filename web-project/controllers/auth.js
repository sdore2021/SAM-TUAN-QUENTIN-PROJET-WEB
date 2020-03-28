const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt"); //marche avec version 12.x de nodejs
const { UserAdm } = require("../models/userAdm.model");

exports.userAdm_auth = async function(req, res, next) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send("Invalid email or password.");

  let userAdm = await UserAdm.findOne({ email: req.body.email });
  if (!userAdm) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(
    req.body.password,
    userAdm.password
  );

  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = userAdm.generateAuthToken();
  res.header("x-header-token", token).send(token);
};

function validate(req) {
  const schema = {
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
  return Joi.validate(req, schema);
}
