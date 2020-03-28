const TauxTVA = require("../models/taut.tva.model");

exports.test = function(req, res) {
  res.send("Hello from de Test controller !");
};

exports.taux_create = function(req, res, next) {
  let taux = new TauxTVA({
    taux: req.body.taux
  });

  taux.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Taux was created and sava database");
  });
};

exports.getTauxAll = function(req, res) {
  TauxTVA.find(function(err, taux) {
    if (err) return next(err);
    res.send(taux);
  });
};

exports.getTaux = function(req, res) {
  TauxTVA.findById(req.params.id, function(err, taux) {
    if (err) return next(err);
    res.send(taux);
  });
};

exports.deleteTaux = function(req, res) {
  TauxTVA.findByIdAndDelete(req.params.id, function(err, taux) {
    if (err) res.send(err);
    res.json(taux);
  });
};
