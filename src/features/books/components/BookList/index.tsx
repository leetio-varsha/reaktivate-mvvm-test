import React from "react";
import { observer } from "mobx-react";
import BookController from "features/books/controllers/BooksController";
import "./BookList.css";

const BooksList = observer(() => {
  const books = BookController.getSelectedTabBooks();

  return (
    <div className="container">
      {books.map((book, index) => (
        <div className="book" key={`${book.id}-${index}`}>
          <h3>{book.name}</h3>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
});

export default BooksList;
