const express =  require("express");

const app = express();
app.use(express.static("./client/build"));
app.use(express.json());

app.use("/api", require("./api"));
app.get("*", (req , res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

module.exports =  app;
