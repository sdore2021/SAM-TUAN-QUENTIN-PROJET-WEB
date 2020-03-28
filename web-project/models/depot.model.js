const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let DepotSchema = new Schema({
  nomDepot: {
    type: String,
    required: true
  },
  articles: [
    {
      articleIden: {
        type: Number
        //required: true
      },
      quantite: {
        type: Number
        //required: true
      },
      oos: {
        // en rupture de stock (out of stock)
        type: Boolean
        //require: true
      }
    }
  ]
});

module.exports = mongoose.model("Depot", DepotSchema);
