const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CommandeSchema = new Schema({
  date_commande: {
    type: Date,
    default: Date.now
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client"
  },
  articles: [
    {
      articleId: {
        type: Schema.Types.ObjectId,
        ref: "Article"
      },
      quantiteOrdered: {
        type: Number
        //required: true
      }
    }
  ]
});

module.exports = mongoose.model("Commande", CommandeSchema);
