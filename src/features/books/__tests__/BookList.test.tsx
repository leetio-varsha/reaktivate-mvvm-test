import React from "react";
import ReactDOM from "react-dom";
import Index from "features/books/components/BookList";
import BookController from "features/books/controllers/BooksController";

jest.mock("../controllers/BooksController", () => ({
  getSelectedTabBooks: jest.fn(),
}));

describe("Index Component", () => {
  it("renders a list of books", () => {
    (BookController.getSelectedTabBooks as jest.Mock).mockReturnValue([
      { id: "1", name: "Mock Book 1", author: "Author 1" },
      { id: "2", name: "Mock Book 2", author: "Author 2" },
    ]);

    const container = document.createElement("div");
    ReactDOM.render(<Index />, container);

    expect(container.querySelector("h3")?.textContent).toBe("Mock Book 1");
    expect(container.querySelector("p")?.textContent).toBe("Author 1");
    expect(container.textContent).toContain("Mock Book 2");
    expect(container.textContent).toContain("Author 2");
  });

  it("renders nothing if no books are returned", () => {
    (BookController.getSelectedTabBooks as jest.Mock).mockReturnValue([]);

    const container = document.createElement("div");
    ReactDOM.render(<Index />, container);

    expect(container.textContent).toBe("");
  });
});
