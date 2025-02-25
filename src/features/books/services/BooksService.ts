import { IBook, IAddBookPayload } from "types/Books.types";
import ApiGateway from "services/ApiGateway";

const apiGateway = new ApiGateway();

const BookService = {
  async fetchBooks(user: string): Promise<IBook[]> {
    return await apiGateway.get<IBook[]>(`/books/${user}/`);
  },

  async addBook(user: string, book: IAddBookPayload): Promise<{ status: string }> {
    return await apiGateway.post<{ status: string }>(`/books/${user}/`, book);
  },

  async fetchPrivateBooks(user: string): Promise<IBook[]> {
    return await apiGateway.get<IBook[]>(`/books/${user}/private`);
  },
};

export default BookService;
