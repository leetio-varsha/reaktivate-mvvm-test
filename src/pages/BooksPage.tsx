import BooksTabs from "features/books/components/BooksTabs";
import React, { useEffect } from "react";
import Button from "components/Button";
import BookController from "features/books/controllers/BooksController";
import { BookAddModal } from "features/books/components/BookAddModal";
import BookList from "features/books/components/BookList";

const BooksPage = () => {
  const fetchBooks = async () => {
    await BookController.fetchAllBooks();
  };
  useEffect(() => {
    void fetchBooks();
  }, []);

  return (
    <>
      <BooksTabs />
      <div className={"container"}>
        <Button
          onClick={() => {
            BookController.toggleAddBookModal(true);
          }}
        >
          Add book
        </Button>
      </div>
      <BookList />
      <BookAddModal />
    </>
  );
};

export default BooksPage;
