import express from "express";
import { books } from "./booksdb.js";
import { isValid } from "./auth_users.js";
import { users } from "./auth_users.js";

const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const user = req.body.user;
  if (!user) {
    return res.status(404).json({ message: "Body Empty" });
  }
  // check if user already exists
  const registeredUser = users.find((u) => u.email === user.email);
  if (registeredUser) {
    return res.status(404).json({ message: "User already registered" });
  } else {
    // check if username is valid
    if (!isValid(user.username)) {
      return res.status(404).json({ message: "Invalid username" });
    } else {
      // register user
      users.push(user);
      return res.status(200).json({ message: "User successfully registered" });
    }
  }
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  // Return books list
  return res.status(200).json({ message: "Success", data: books });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  // If no book found, return 404
  if (!books[req.params.isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }
  // Book data based on ISBN
  return res
    .status(200)
    .json({ message: "Success", data: books[req.params.isbn] });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  // Get all books based on author
  const author = req.params.author;
  const booksByAuthor = [];
  for (const book in books) {
    if (books[book].author.toLowerCase().includes(author.toLowerCase())) {
      booksByAuthor.push(books[book]);
    }
  }
  // If no book found, return 404
  if (booksByAuthor.length === 0) {
    return res.status(404).json({ message: "Book not found" });
  }
  return res.status(200).json({ message: "Success", data: booksByAuthor });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  // Get all books based on title
  const title = req.params.title;
  const booksByTitle = [];
  for (const book in books) {
    if (books[book].title.toLowerCase().includes(title.toLowerCase())) {
      booksByTitle.push(books[book]);
    }
  }
  // If no book found, return 404
  if (booksByTitle.length === 0) {
    return res.status(404).json({ message: "Book not found" });
  }
  return res.status(200).json({ message: "Success", data: booksByTitle });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  // Get book review
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  return res.status(200).json({ message: "Success", data: book.reviews });
});

export { public_users as general };
