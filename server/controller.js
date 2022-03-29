const books = require("./db.json");
globalID = 4;
module.exports = {
  getBooks: (req, res) => {
    res.status(200).send(books);
  },
  createNewBook: (req, res) => {
    let newBook = req.body;

    newBook.id = globalID;

    books.push(newBook);

    res.status(200).send(books);
    globalID++;
  },
  deleteBook: (req, res) => {
    let index = books.findIndex((books) => +books.id === +req.params.id);
    books.splice(index, 1);
    res.status(200).send(books);
  },
};
