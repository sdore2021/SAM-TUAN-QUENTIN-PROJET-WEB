const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let FactureSchema = new Schema({
  date_commande: { type: Date, default: Date.now },
  livraison: [{ type: Schema.Types.ObjectId, ref: "Livraison" }]
});

module.exports = mongoose.model("Facture", FactureSchema);
