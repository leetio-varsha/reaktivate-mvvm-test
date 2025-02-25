import BookController from "features/books/controllers/BooksController";
import React from "react";
import { observer } from "mobx-react";

export const BookPrivateCounter = observer(() => {
  const privateCount: number = BookController.getPrivateBookCount();
  return <div>Private Books: {privateCount}</div>;
});
