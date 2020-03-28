// ne sert à rien
/*const Client = require("../models/client.model");
const Commande = require("../models/commande.model");
const Article = require("../models/article.model");
const TauxTVA = require("../models/taut.tva.model");

exports.test = function(req, res) {
  res.send("Hello from de Test controller !");
};

exports.client_create = function(req, res, next) {
  let client = new Client({
    nom_client: req.body.nom_client,
    taux_remise: req.body.taux_remise,
    commande: req.body._id
  });
  client.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("client created and command succcessfull");
  });
};

exports.client_add_commade = function(req, res, next) {
  Client.findByIdAndUpdate(
    req.params.id,
    { $push: { commande: req.body._id } },
    function(err, post) {
      if (err) res.send(err);
      res.json(post);
    }
  );
};

exports.client_cre_add_commande = function(req, res, next) {
  let commande = new Commande({
    //articles: { $push: req.body._id }
    articles: req.body._id
  });

  commande.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("create command succcessfull");
  });
};

exports.article_add_commande = function(req, res, next) {
  Commande.findByIdAndUpdate(
    req.params.id,
    { $push: { articles: req.body._id } },
    function(err, post) {
      if (err) res.send(err);
      res.json(post);
    }
  );
};

exports.article_create = function(req, res, next) {
  let article = new Article({
    prix_HT: req.body.prix_HT,
    qts: req.body.qts,
    taux_tva: req.body.taux_tva
  });

  article.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("article was created and save in database");
  });
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
*/
