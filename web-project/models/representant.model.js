const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RepresentantSchema = new Schema({
  clients: [{ type: Schema.Types.ObjectId, ref: "Client" }]
});

module.exports = mongoose.model("Representant", RepresentantSchema);
