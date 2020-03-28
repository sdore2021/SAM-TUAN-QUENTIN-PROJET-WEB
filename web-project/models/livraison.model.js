const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let LivraisonSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: "Livraison" }
});

module.exports = mongoose.model("Livraison", LivraisonSchema);
