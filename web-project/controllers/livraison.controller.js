const Livraison = require("../models/livraison.model");

exports.livraison_create = function(req, res, next) {
  let livraison = new Livraison({
    client: req.body._id_client
  });
  livraison.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("livraison created succcessfull");
  });
};
