import BookStore from "features/books/stores/BooksStore";
import BookService from "features/books/services/BooksService";
import { EbooksType, IAddBookPayload } from "types/Books.types";

jest.mock("features/books/services/BooksService");

describe("BookStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with default values", () => {
    expect(BookStore.books).toEqual([]);
    expect(BookStore.privateBooks).toEqual([]);
    expect(BookStore.filterType).toBe(EbooksType.ALL);
    expect(BookStore.getAddBookModalOpen()).toBe(false);
  });

  it("fetches books and updates the store", async () => {
    const mockBooks = [{ id: 1, title: "Test Book" }];
    const mockPrivateBooks = [{ id: 2, title: "Private Book" }];

    (BookService.fetchBooks as jest.Mock).mockResolvedValue(mockBooks);
    (BookService.fetchPrivateBooks as jest.Mock).mockResolvedValue(mockPrivateBooks);

    await BookStore.fetchBooks();

    expect(BookStore.books).toEqual(mockBooks);
    expect(BookStore.privateBooks).toEqual(mockPrivateBooks);
    expect(BookService.fetchBooks).toHaveBeenCalledWith("yuri");
    expect(BookService.fetchPrivateBooks).toHaveBeenCalledWith("yuri");
  });

  it("toggles the add book modal", () => {
    expect(BookStore.getAddBookModalOpen()).toBe(false);
    BookStore.toggleAddBookModal(true);
    expect(BookStore.getAddBookModalOpen()).toBe(true);
  });

  it("adds a book and refreshes the store", async () => {
    const bookPayload: IAddBookPayload = { id: 1, name: "New Book", author: "Author" };
    (BookService.addBook as jest.Mock).mockResolvedValue({ status: "ok" });
    jest.spyOn(BookStore, "fetchBooks").mockImplementation(jest.fn());

    await BookStore.addBook(bookPayload);

    expect(BookService.addBook).toHaveBeenCalledWith("yuri", bookPayload);
    expect(BookStore.fetchBooks).toHaveBeenCalled();
    expect(BookStore.getAddBookModalOpen()).toBe(false);
  });

  it("switches the filter type", () => {
    expect(BookStore.filterType).toBe(EbooksType.ALL);
    BookStore.switchFilter(EbooksType.PRIVATE);
    expect(BookStore.filterType).toBe(EbooksType.PRIVATE);
  });

  it("returns the correct private books count", () => {
    BookStore.privateBooks = [{ id: 1, name: "New Book", author: "Author" }];
    expect(BookStore.getPrivateBookCount()).toBe(1);
  });
});
