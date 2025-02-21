const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const config = {
  PORT: process.env.PORT || 3000, // Çevresel değişken desteği
  MORGAN_FORMAT: "dev", // İstersen "combined" da kullanabilirsin
};

const setupMiddlewares = (app) => {
  app.use(morgan(config.MORGAN_FORMAT));
  app.use(express.json());
  app.use(cors());
};

module.exports = { config, setupMiddlewares };
