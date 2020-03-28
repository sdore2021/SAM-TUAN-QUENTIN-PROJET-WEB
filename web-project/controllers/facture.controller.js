const Facture = require("../models/facture.model");

exports.facture_create = function(req, res, next) {
  let facture = new Facture({
    livraison: req.body._id_livraison
  });

  facture.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("facture created and succcessfull");
  });
};

exports.facture_add_livraison = function(req, res, next) {
  Facture.findByIdAndUpdate(
    req.params.id,
    { $push: { livraison: req.body._id_livraison } },
    function(err, post) {
      if (err) res.send(err);
      res.json(post);
    }
  );
};
