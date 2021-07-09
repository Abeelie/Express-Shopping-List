const express = require("express");
const ExpressError = require("./expressError");
const listRoutes = require("./routes/list");  
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use("/list", listRoutes);
app.use(morgan('dev'));

app.use(function (req, res, next) {
  return new ExpressError("Page Not Found", 404);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

module.exports = app