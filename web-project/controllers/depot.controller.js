const Depot = require("../models/depot.model");

exports.create_depot = function(req, res, next) {
  let depot = new Depot({
    nomDepot: req.body.nomDepot,
    articles: req.body._id_article,
    articles: {
      articleIden: req.body.articleIden,
      quantite: req.body.quantite,
      oos: req.body.oos
    }
  });

  depot.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send(depot);
  });
};

exports.article_add_depot = function(req, res, next) {
  Depot.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        articles: {
          articleIden: req.body.articleIden,
          quantite: req.body.quantite,
          oos: req.body.oos
        }
      }
    },
    function(err, post) {
      if (err) res.send(err);
      res.json(post);
    }
  );
};

exports.getDepotAll = function(req, res) {
  Depot.find(function(err, depot) {
    if (err) return next(err);
    res.send(depot);
  });
};
