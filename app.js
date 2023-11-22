var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./app/welcome/router");

const {
  SwaggerUIBundle,
  SwaggerUIStandalonePreset,
} = require("swagger-ui-dist");
const swaggerJsdoc = require("swagger-jsdoc");

var app = express();

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

// Load Swagger JSON documentation from a file
const options = {
  swaggerDefinition: require("./public/doc/filkom-api-doc.json"),
  apis: [],
};

// dokumentasi
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = swaggerJsdoc(options);

// Middleware untuk menampilkan Spesifikasi API dengan Swagger UI
// app.use("/api-docs", swaggerUi.serve);
// app.get("/api-docs", swaggerUi.setup(swaggerSpecs, options));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.1/swagger-ui.min.css",
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
