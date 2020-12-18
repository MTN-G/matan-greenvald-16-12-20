const express = require("express");
const path = require("path") ;

const app = express();
app.use(express.static("build"));
app.use(express.json());

const dir_name = process.cwd()

app.use("/api", require("./api"));
app.get("*", (req , res) => {
  res.sendFile(path.resolve(dir_name, "client/build", "index.html"));
});

module.exports =  app;
