const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TauxTVASchema = new Schema({
  taux: Number
});

module.exports = mongoose.model("TauxTVA", TauxTVASchema);
