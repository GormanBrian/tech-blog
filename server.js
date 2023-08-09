const path = require("path");
const express = require("express");
const hbs = require("express-handlebars").create({ helpers });

const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () =>
  console.log(`Now listening at http://localhost:${PORT}`)
);
