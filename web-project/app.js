var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//add pour correction ------->>>>>>1
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

//new ligne
const bodyParser = require("body-parser");
const gestion = require("./routes/gestion.route");

//set up mongoose connection
const mongoose = require("mongoose");
let dev_db_url = "mongodb://localhost:27017/db_gestions"; // mettre en commtaire
let mongoDB = process.env.MONGODB_URL || dev_db_url; // mettre url
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function() {
  console.log("CONNEDT TO DATABASE !");
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ajout de ------->>>> 1
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/gestions", gestion);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
