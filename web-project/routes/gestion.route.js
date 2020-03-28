const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const client_controller = require("../controllers/client.controller");
const commande_controller = require("../controllers/commande.controller");
const article_controller = require("../controllers/article.controller");
const taut_tva_controller = require("../controllers/taut.tva.controller");
const livraison_controller = require("../controllers/livraison.controller");
const depot_controller = require("../controllers/depot.controller");
const facture_controller = require("../controllers/facture.controller");

const userAdm_controller = require("../controllers/userAdm.controller");
const auth_controller = require("../controllers/auth");

// test app
router.get("/test", taut_tva_controller.test);

//all about userAdmin
router.get("/getUserAdm/me", auth, userAdm_controller.userAdm_get); // auth ici =>  authorization
router.post("/createUserAdm", userAdm_controller.userAdm_create); // mettre option auth ici
router.post("/auth", auth_controller.userAdm_auth); // auth ici => authentification

// all about client
router.post("/createClient", client_controller.client_create);
router.put("/clientAddCommand/:id", client_controller.client_add_commade);
router.get("/getClient", client_controller.getClientAll);
router.get("/getClient/:id", client_controller.getClient);
router.delete("/deleteClient/:id", client_controller.deleteClient);

// all about command
router.post("/createCommande", commande_controller.client_cre_add_commande);
router.put("/ArticleAddCommand/:id", commande_controller.article_add_commande);
router.get("/getCommande", commande_controller.getCommandeAll);
router.get("/getCommande/:id", commande_controller.getCommande);
router.delete("/deleteCommande/:id", commande_controller.deleteCommande);

// all about article
router.post("/createArticle", article_controller.article_create);
router.get("/getArticle", article_controller.getArticleAll);
router.get("/getArticle/:id", article_controller.getArticle);
router.delete("/deleteArticle/:id", article_controller.deleteArticle);

// all about taux_tva
router.post("/createTaux", taut_tva_controller.taux_create);
router.get("/getTaux", taut_tva_controller.getTauxAll);
router.get("/getTaux/:id", taut_tva_controller.getTaux);
router.delete("/deleteTaux/:id", taut_tva_controller.deleteTaux);

//all about livraison
router.post("/createLivraison", livraison_controller.livraison_create);
/*
router.get("/getLivraison", livraison_controller.getLivraisonAll);
router.get("/getLivraison/:id", livraison_controller.getLivraison);
router.delete("deleteLivraison/:id", livraison_controller.deleteLivraison);
*/

// all about depot
router.post("/createDepot", depot_controller.create_depot);
router.put("/depotAddArticle/:id", depot_controller.article_add_depot);
router.get("/getDepot", depot_controller.getDepotAll);

/*
router.get("/getDepot", depot_controller.getDepotAll);
router.get("/getDepot/:id", depot_controller.getDepot);
router.delete("deleteDepot/:id", depot_controller.deleteDepot);
*/

// all about facture
router.post("/createFacture", facture_controller.facture_create);
router.put(
  "/factureAddLivraison/:id",
  facture_controller.facture_add_livraison
);
/*
router.get("/getFacture", facture_controller.getFactureAll);
router.get("/getFacture/:id", facture_controller.getFacture);
router.delete("deleteFacture/:id", facture_controller.deleteFacture);
*/

module.exports = router;
