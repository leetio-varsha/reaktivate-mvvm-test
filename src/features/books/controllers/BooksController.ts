import bookStore from "features/books/stores/BooksStore";
import { EbooksType, IAddBookPayload, IBook, TFilterType } from "types/Books.types";
import booksStore from "features/books/stores/BooksStore";

const BookController = {
  async fetchAllBooks() {
    await booksStore.fetchBooks();
  },

  getSelectedTabBooks(): IBook[] {
    const selectedTab = bookStore.filterType;
    if (selectedTab === EbooksType.ALL) {
      return bookStore.books;
    } else if (selectedTab === EbooksType.PRIVATE) {
      return bookStore.privateBooks;
    } else {
      return [];
    }
  },

  toggleAddBookModal(status: boolean) {
    bookStore.toggleAddBookModal(status);
  },

  getAddBookModalIsOpen(): boolean {
    return bookStore.getAddBookModalOpen();
  },

  async addBook(bookData: IAddBookPayload) {
    await bookStore.addBook(bookData);
  },

  async switchFilter(type: TFilterType) {
    bookStore.switchFilter(type);
    await bookStore.fetchBooks();
  },

  getSelectedFilterType(): TFilterType {
    return bookStore.filterType;
  },

  getPrivateBookCount(): number {
    return bookStore.getPrivateBookCount();
  },
};

export default BookController;
