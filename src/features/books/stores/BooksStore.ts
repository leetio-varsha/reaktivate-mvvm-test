import { makeAutoObservable, runInAction } from "mobx";
import BookService from "features/books/services/BooksService";
import { EbooksType, IAddBookPayload, IBook, TFilterType } from "types/Books.types";

const USER_NAME = "yuri";

class BookStore {
  books: IBook[] = [];
  privateBooks: IBook[] = [];
  filterType: TFilterType = EbooksType.ALL;
  addBookModalOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBooks() {
    const allBooks: IBook[] = await BookService.fetchBooks(USER_NAME);
    const privateBooks: IBook[] = await BookService.fetchPrivateBooks(USER_NAME);
    runInAction(() => {
      this.books = allBooks;
      this.privateBooks = privateBooks;
    });
  }

  toggleAddBookModal(status: boolean) {
    this.addBookModalOpen = status;
  }

  getAddBookModalOpen() {
    return this.addBookModalOpen;
  }

  async addBook(book: IAddBookPayload) {
    const response = await BookService.addBook(USER_NAME, book);
    if (response.status === "ok") {
      void this.fetchBooks();
      this.toggleAddBookModal(false);
    }
  }

  switchFilter(type: TFilterType) {
    this.filterType = type;
  }

  getPrivateBookCount() {
    return this.privateBooks.length;
  }
}

export default new BookStore();
