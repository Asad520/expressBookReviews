import express from "express";
import jwt from "jsonwebtoken";
import { books } from "./booksdb.js";

const regd_users = express.Router();

const users = [
  { email: "admin@abc.com", password: "admin123", username: "admin" },
];

const isValid = (username) => {
  return username?.length > 3;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const user = req.body.user;
  if (!user) {
    return res.status(404).json({ message: "Body Empty" });
  }

  // check is user is registered
  const registeredUser = users.find((u) => u.email === user.email);
  if (!registeredUser) {
    return res.status(404).json({ message: "User not registered" });
  } else {
    // check if password is correct
    if (registeredUser.password !== user.password) {
      return res.status(404).json({ message: "Password incorrect" });
    } else {
      // authenticate user
      let accessToken = jwt.sign(
        {
          data: user,
        },
        "access",
        { expiresIn: 60 * 60 * 1000 }
      );

      req.session.authorization = {
        accessToken,
      };
      return res.status(200).json({ message: "User successfully logged in" });
    }
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  // Add book review
  const isbn = req.params.isbn;
  const review = req.body.review;
  if (!isbn) {
    return res.status(404).json({ message: "ISBN not provided" });
  }
  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }
  if (!review) {
    return res.status(404).json({ message: "Body Empty" });
  }

  // Add review against the email for book
  books[isbn].reviews[req.user.data.email] = review;
  return res.status(200).json({ message: "Review added successfully" });
});

export { regd_users as authenticated, isValid, users };
