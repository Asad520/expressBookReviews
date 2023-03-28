// Driver file for book reviews
import axios from "axios";

const url = "http://localhost:5000";

// Get all books
const getAllBooks = async () => {
  const response = await axios.get(`${url}/`);
  return response.data;
};

// Get book details based on ISBN
const getBookByISBN = async (isbn) => {
  const response = await axios.get(`${url}/isbn/${isbn}`);
  return response.data;
};

// Get book details based on author
const getBookByAuthor = async (author) => {
  const response = await axios.get(`${url}/author/${author}`);
  return response.data;
};

// Get all books based on title
const getBookByTitle = async (title) => {
  const response = await axios.get(`${url}/title/${title}`);
  return response.data;
};

getAllBooks().then((data) => console.log(data));
getBookByISBN("1").then((data) => console.log(data.data));
getBookByAuthor("chin").then((data) => console.log(data));
getBookByTitle("job").then((data) => console.log(data));
