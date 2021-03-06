const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Data = require("./database");
const mongoose = require("mongoose");
const BirdModel = require("./models/bird.model");
// const fireBaseAdmin = require('firebase-admin');

const connectionString =
  "mongodb+srv://admin:admin@cluster0.keosc.mongodb.net/tododb?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.json());
app.use(cors());

let Bird;
let bird1;

app.get("/birds", async (req, res) => {
  let hung = await Bird.find();
  res.send({
    hung: hung,
  });
});

app.post("/bird", async (req, res) => {
  const { name, img } = req.body;
  try {
    // db.createBird(new Bird(name,img));
    let newBird =await Data.instance.createBird(new BirdModel(name, img));
    res.status(200).send({
      newBird: newBird,
    });
  } catch (err) {
    res.status(400).send({
      message: "invalid",
    });
  }
});

async function main() {
  try {
    let db = await Data.instance.connectDb(connectionString);
    app.listen(8080, "192.168.31.209", () => {
      console.log("server is running !");
    });
  } catch (e) {
    console.error(e);
  }
}

main();
