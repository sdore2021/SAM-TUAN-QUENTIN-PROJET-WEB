const Commande = require("../models/commande.model");

exports.client_cre_add_commande = function(req, res, next) {
  let commande = new Commande({
    clientId: req.body._id_client,
    articles: {
      articleId: req.body._id_article,
      quantiteOrdered: req.body.quantiteOrdered
    }
  });

  commande.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send(commande);
  });
};

exports.article_add_commande = function(req, res, next) {
  Commande.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        articles: {
          articleId: req.body._id_article,
          quantiteOrdered: req.body.quantiteOrdered
        }
      }
    },
    function(err, post) {
      if (err) res.send(err);
      res.json(post);
    }
  );
};

exports.getCommandeAll = function(req, res) {
  Commande.find(function(err, commande) {
    if (err) return next(err);
    res.send(commande);
  });
};

exports.getCommande = function(req, res) {
  Commande.findById(req.params.id, function(err, commande) {
    if (err) return next(err);
    res.send(commande);
  });
};

exports.deleteCommande = function(req, res) {
  Commande.findByIdAndDelete(req.params.id, function(err, commande) {
    if (err) res.send(err);
    res.json(commande);
  });
};
