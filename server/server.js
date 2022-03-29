const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");

const { getBooks, createNewBook, deleteBook } = require("./controller.js");

const books = require("./db.json");
const app = express();

app.use(express.json());
app.use(cors());

const users = [];

//Endpoints and Middleware
//app.use("/", express.static(path.join(__dirname, "../public/index.html")));

// app.use("/styles", express.static(path.join(__dirname, "../public/index.css")));
// app.use("/js", express.static(path.join(__dirname, "../public/main.js")));

// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// });

app.use("/styles", express.static(path.join(__dirname, "../public/index.css")));
app.use(
  "/js",
  express.static(path.join(__dirname, "../public/addbook/addbook.js"))
);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/addbook/addbook.html"));
});
//***********
app.get(`/api/books`, getBooks);
app.post(`/api/books`, createNewBook);
app.delete("/api/books/:id", deleteBook);

// app.get("/", (req, res) => {
//   res.render("index.html", { name: "Israel" });
// });
//For Search result
const inventory = [
  "The Candy House",
  "Sea of Tranquility",
  "Lessons in Chemistry",
  "Finding Me",
  "swordfish steak",
  "French Braid",
  "The Cartographers",
  "booth",
  "In Love: A Memoir of Love and Loss",
  "Tell Me Everything: The Story of a Private Investigation",
];
app.get("/api/inventory", (req, res) => {
  console.log(req.query);
  if (req.query.item) {
    const filteredItems = inventory.filter((invItem) =>
      invItem.toLowerCase().includes(req.query.item.toLowerCase())
    );
    res.status(200).send(filteredItems);
  } else {
    res.status(200).send(inventory);
  }
});

const port = process.env.PORT || 4008;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
