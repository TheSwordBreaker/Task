const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");

const options = require("./doc/options.json");

// const swaggerUi = require("swagger-ui-express");
// const swaggerUi = require("swagger-ui-express");
// const swaggerJSDoc = require("swagger-jsdoc");
// const swaggerDocument = require("./swagger.json");

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

require("dotenv").config();

const indexRouter = require("./routes/index");

const app = express();

var cors = require("cors");
app.use(cors());
app.use(helmet());
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

const specs = swaggerJSDoc(options);

app.use("/user", indexRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const url = process.env.MONGODB_URL;

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose
  .connect(encodeURI(url), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected:", url);
  });

const db = mongoose.connection;
// db.once("open", async (_) => {
//   console.log("Database connected:", url);
// });

db.on("error", (err) => {
  console.error("connection error:", err);
});

app.use(express.static(path.join(__dirname, "video")));

app.use(function (req, res, next) {
  next(createError(404, "No Url Found"));
});

process.on("uncaughtException", (err) => {
  console.log(err);
});
process.on("uncaughtExceptionMonitor", (err) => {
  console.log(err);
});
process.on("unhandledRejection", (err) => {
  console.log(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message
  // res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  console.log(err);

  res.status(err.status || 500);
  // res.render('error');
  res.json({
    status: 0,
    msg: err.message,
    data: {},
  });
  return;
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Application is running on Port ${port}`);
});
