//Creating book related APIs like get, add and delete book
const bookRouter = require("express").Router();
const Book = require("../models/book");

//Get All books
bookRouter.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Specific book
bookRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.findById(id);

    res.json(book);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//create book
bookRouter.post("/", async (req, res) => {
  const { name, author, description, price, quantity, review } = req.body;
  console.log(`From Book Router: ${req.body}`);

  try {
    const bookEntity = new Book({
      name,
      author,
      description,
      price,
      quantity,
      review,
    });
    console.log(bookEntity);
    await bookEntity.save();
    res.json(bookEntity);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Update book
bookRouter.put("/:id", async (req, res) => {
  console.log("BookRouter called");
  const id = req.params.id;
  const { name, author, description, price, quantity, review } = req.body;
  console.log(req.body);
  try {
    const bookEntity = await Book.findById(id);

    bookEntity.name = name;
    bookEntity.author = author;
    bookEntity.quantity = quantity;
    bookEntity.price = price;
    bookEntity.description = description;
    bookEntity.review = review;

    await bookEntity.save();
    console.log("book updated");
    res.json(bookEntity);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Delete book
bookRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const bookEntity = await Book.findById(id);
    await bookEntity.deleteOne();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = { bookRouter };
