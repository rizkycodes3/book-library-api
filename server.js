const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
const filePath = path.join(__dirname, "books.json");

app.get("/", (req, res) => {
  res.json({ welcome: "Welcome to our book library" });
});

app
  .route("/books")
  .get((req, res) => {
    try {
      const readFile = fs.readFileSync(filePath, "utf-8");
      const books = JSON.parse(readFile);
      res.json(books);
    } catch (err) {
      res.status(500).json({ message: "Failed to read data" });
    }
  })
  .post((req, res) => {
    try {
      const readFile = fs.readFileSync(filePath, "utf-8");
      const books = JSON.parse(readFile);

      const { id, title, author, year, genre, price, in_stock } = req.body;
      const numId = id ? Number(id) : books.length > 0 ? books[books.length - 1].id + 1 : 1;
      const numYear = year ? Number(year) : new Date().getFullYear();
      const numPrice = price ? Number(price) : 0;
      const sameId = books.find((x) => x.id === numId);

      if (!title || !author) {
        return res.status(400).json({ message: "The title and author must be entered" });
      }
      if (Number.isNaN(numId) || Number.isNaN(numYear) || Number.isNaN(numPrice)) {
        return res.status(400).json({ message: "id, year, or price is not a valid number" });
      }
      if (sameId) {
        return res.status(400).json({ message: "The ID you entered already exists" });
      }

      const newBook = {
        id: numId,
        title,
        author,
        year: numYear,
        genre: genre || "Other",
        price: numPrice,
        in_stock: in_stock ? in_stock === true || in_stock === false : false,
      };

      const insertIndex = books.findIndex((book) => book.id > newBook.id);

      if (insertIndex === -1) {
        books.push(newBook);
      } else {
        books.splice(insertIndex, 0, newBook);
      }

      fs.writeFileSync(filePath, JSON.stringify(books, null, 2), "utf-8");
      res.status(201).json({
        message: "The book was successfully added!",
        data: newBook,
      });
    } catch (err) {
      res.status(500).json({ message: "Failed to save book data" });
    }
  });

app
  .route("/books/:id")
  .get((req, res) => {
    try {
      const readFile = fs.readFileSync(filePath, "utf-8");
      const books = JSON.parse(readFile);

      const reqId = parseInt(req.params.id);
      const bookId = books.find((x) => x.id === reqId);
      res.json(bookId);
    } catch (err) {
      res.status(500).json({ message: "Failed to read data" });
    }
  })
  .patch((req, res) => {
    try {
      const readFile = fs.readFileSync(filePath, "utf-8");
      const books = JSON.parse(readFile);

      const reqId = parseInt(req.params.id);
      const newData = req.body;
      const oldData = books.find((x) => x.id === reqId);
      const numYear = newData.year ? Number(newData.year) : oldData.year;
      const numPrice = newData.price ? Number(newData.price) : oldData.price;

      if (!newData) {
        return res.status(400).json({ message: "Your data is empty" });
      }
      if (Number.isNaN(numYear) || Number.isNaN(numPrice)) {
        return res.status(400).json({ message: "year or price is not a valid number" });
      }

      const newBook = {
        id: oldData.id,
        title: newData.title || oldData.title,
        author: newData.author || oldData.author,
        year: numYear,
        genre: newData.genre || oldData.genre,
        price: numPrice,
        in_stock: newData.in_stock ? newData.in_stock === true || newData.in_stock === false : oldData.in_stock,
      };

      const bookIndex = books.findIndex((x) => x.id === reqId);
      books.splice(bookIndex, 1, newBook);
      fs.writeFileSync(filePath, JSON.stringify(books, null, 2), "utf-8");

      res.status(201).json({
        message: "Successfully updated the ledger data!",
        data: newBook,
      });
    } catch {
      res.status(500).json({ message: "Failed to modify book data" });
    }
  })
  .delete((req, res) => {
    try {
      const readFile = fs.readFileSync(filePath, "utf-8");
      const books = JSON.parse(readFile);

      const reqId = parseInt(req.params.id);
      const bookIndex = books.findIndex((x) => x.id === reqId);

      if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found!" });
      }

      books.splice(bookIndex, 1);
      fs.writeFileSync(filePath, JSON.stringify(books, null, 2), "utf-8");
      res.status(200).json({ message: "Successfully deleted the book data!" });
    } catch {
      res.status(500).json({ message: "Failed to delete data" });
    }
  });

app.listen(port, () => {
  console.log(`server starter to http//:localhost:${port}`);
});
