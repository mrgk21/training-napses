require("@babel\register");

const path = require("path");

module.exports = {
  config: path.resolve("./src/db2/config", "config.js"),
  "models-path": path.resolve("./src/db2/models"),
  "seeders-path": path.resolve("./src/db2/seeders"),
  "migrations-path": path.resolve("./src/db2/migrations"),
};
