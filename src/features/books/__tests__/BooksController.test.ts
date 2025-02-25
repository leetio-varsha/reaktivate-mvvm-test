import BookController from "features/books/controllers/BooksController";
import booksStore from "features/books/stores/BooksStore";
import { EbooksType } from "types/Books.types";

jest.mock("../stores/BooksStore", () => ({
  books: [],
  privateBooks: [],
  filterType: "ALL",
  fetchBooks: jest.fn(),
  switchFilter: jest.fn(),
  toggleAddBookModal: jest.fn(),
}));

describe("BookController", () => {
  it("fetches all books", async () => {
    await BookController.fetchAllBooks();

    expect(booksStore.fetchBooks).toHaveBeenCalled();
  });

  it("returns books based on the selected filter", () => {
    (booksStore.books as unknown) = [{ id: "1", name: "Book 1" }];
    (booksStore.privateBooks as unknown) = [{ id: "2", name: "Book 2" }];

    booksStore.filterType = EbooksType.ALL;
    expect(BookController.getSelectedTabBooks()).toEqual([{ id: "1", name: "Book 1" }]);

    booksStore.filterType = EbooksType.PRIVATE;
    expect(BookController.getSelectedTabBooks()).toEqual([{ id: "2", name: "Book 2" }]);
  });

  it("toggles the add book modal", () => {
    BookController.toggleAddBookModal(true);
    expect(booksStore.toggleAddBookModal).toHaveBeenCalledWith(true);
  });
});
