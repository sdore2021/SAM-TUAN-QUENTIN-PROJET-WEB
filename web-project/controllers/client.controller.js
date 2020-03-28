const Client = require("../models/client.model");

exports.client_create = async function(req, res, next) {
  try {
    let clientExist = await Client.findOne({
      nom_client: req.body.token.card.name
    });
    console.log(req.body);
    let articles = await Promise.all(
      req.body.addedItemsArray.map(async item => {
        let article = {};
        let articleOrdered = await Article.findOne({ identificateur: item.id });

        article.articleId = articleOrdered.id;
        article.quantiteOrdered = item.quantity;

        return article;
      })
    );
    if (clientExist) {
      // Check if client exist in db
      // Create a new commande
      console.log(articles);
      Commande.create({
        date_commande: Date.now(),
        clientId: clientExist.id,
        articles: articles
      });
    } else {
      // Create a new client in db if not exist
      console.log(articles);
      Client.create({
        nom_client: req.body.token.card.name,
        taux_remise: 0.2
      }).then(data => {
        // Create a new commande for a new client
        Commande.create({
          date_commande: Date.now(),
          clientId: data.id,
          articles: articles
        });
      });
    }
    res.send({ success: true }); //Buffer, String, Integer, Object
  } catch (e) {
    res.send({ error: e.toString() });
  }
};

exports.client_add_commade = function(req, res, next) {
  Client.findByIdAndUpdate(
    req.params.id,
    { $push: { commande: req.body._id_commande } },
    function(err, post) {
      if (err) res.send(err);
      res.json(post);
    }
  );
};

exports.getClientAll = function(req, res) {
  Client.find(function(err, client) {
    if (err) return next(err);
    res.send(client);
  });
};

exports.getClient = function(req, res) {
  Client.findById(req.params.id, function(err, client) {
    if (err) return next(err);
    res.send(client);
  });
};

exports.deleteClient = function(req, res) {
  Client.findByIdAndDelete(req.params.id, function(err, client) {
    if (err) res.send(err);
    res.json(client);
  });
};
