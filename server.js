const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.static(__dirname));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test");
const conn = mongoose.connection;
conn.on("connected", function () {
  console.log("You are Connected");
});

const productSchema = new mongoose.Schema({
  proID: String,
  proName: String,
  price: Number,
  qty: Number,
});

const productModel = new mongoose.model(
  "productModel",
  productSchema,
  "Product"
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/homepage.html");
});

app.get("/api/get", async function (req, res) {
  await productModel.find({}).then((result) => {
    res.json(result);
  });
});

app.post("/api/post", async function (req, res) {
  await productModel
    .create({
      proID: req.body.proID,
      proName: req.body.proName,
      price: req.body.price,
      qty: req.body.qty,
    })
    .then((result) => {
      res.json(result);
    });
});

app.delete("/api/delete/:id", async function (req, res) {
  await productModel
    .deleteOne({
      proID: req.params.id,
    })
    .then((result) => {
      res.json(result);
    });
});

app.put("/api/put", async function (req, res) {
  await productModel
    .updateOne(
      { proID: req.body.proID },
      {
        $set: {
          proName: req.body.proName,
          price: req.body.price,
          qty: req.body.qty,
        },
      }
    )
    .then((result) => {
      res.json(result);
    });
});

app.listen(4000, function () {
  console.log("server Running on port 4000");
});
