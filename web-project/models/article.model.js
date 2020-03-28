const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  identificateur: {
    type: Number
    //required: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String
    //required: true
  },
  price: {
    type: Number,
    required: true
  },
  // img: {
  //   type: String,
  //   required: true
  // },
  depot: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Depot"
    }
  ]
});

module.exports = mongoose.model("Article", ArticleSchema);
