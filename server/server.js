const express = require("express");
const connection = require("./models").connection;
const router = require("./routes");
const cors = require("cors");
//const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
//app.use(express.static(path.join(__dirname, "build")));

app.use("/api", router);

app.get("/reset", (req, res) => {
  connection
    .sync({
      force: true,
    })
    .then(() => {
      res.status(201).send({ message: "Database reset" });
    })
    .catch(() => {
      res.status(500).send({ message: "Database reset failed" });
    });
});

app.use("/*", (req, res) => {
  res.status(200).send("App running");
});

let port = 8080;
app.listen(port, () => {
  console.log("Server is running on " + port);
});

//app.listen(process.env.PORT);
