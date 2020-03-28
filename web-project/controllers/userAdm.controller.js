const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); //marche avec version 12.x de nodejs
const { UserAdm, validate } = require("../models/userAdm.model");

exports.userAdm_get = async function(req, res) {
  const userAdm = await UserAdm.findById(req.userAdm._id).select("-password");
  res.send(userAdm);
};

exports.userAdm_create = async function(req, res, next) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let userAdm = await UserAdm.findOne({ email: req.body.email });
  if (userAdm) return res.status(400).send("User already registered.");

  // hashage du password
  const salt = await bcrypt.genSalt(10);
  let password_hash = await bcrypt.hash(req.body.password, salt);

  userAdm = new UserAdm({
    name: req.body.name,
    email: req.body.email,
    password: password_hash
  });

  const token = userAdm.generateAuthToken();

  userAdm.save(function(err) {
    if (err) {
      return next(err);
    }
    res
      .header("x-header-token", token)
      .send({ _id: userAdm._id, name: userAdm.name, email: userAdm.email });
  });
};
