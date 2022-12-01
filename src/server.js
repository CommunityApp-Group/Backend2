const express = require("express");
const nocache = require("nocache")
const helmet = require("helmet");

const server = express();

server.use(helmet.frameguard({ action: "SAMEORIGIN" }));
server.use(express.json({ limit: "124kb" }));
server.use(express.json({ limit: "124kb" }));
server.use(
  express.urlencoded({
    extended: false,
    limit: "124kb",
  })
);
server.use(nocache());

server.get("/", (_, res) =>
  res.send("Welcome To Bridge Backend Server")
); 


server.use(helmet());



module.exports = server;