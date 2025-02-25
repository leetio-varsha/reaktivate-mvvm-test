# Project Documentation

## Overview

This project is a React-based application that uses **MobX** for state management and revolves around managing books. It also utilizes an API Gateway for communication with a backend API. The purpose of this document is to provide an overview and guide for developers who will maintain or further develop the project.

---

## Key Features

- **Book Management**
    - Fetching public and private books.
    - Adding new books.
    - Viewing the list of books.

- **State Management with MobX**
    - A global MobX store (`BookStore`) is used to manage the application's book-related state.

- **API Integration**
    - HTTP requests are handled through a custom `ApiGateway` class.
    - API Base URL is configured using an environment variable.

---

## Project Structure

### 1. **Environment Variables**
The API Base URL is defined in the `.env` file using the key `REACT_APP_API_BASE`. Example:
```dotenv
REACT_APP_API_BASE=https://tdd.demo.reaktivate.com/v1
```

Make sure this variable is set before running the project.

---

### 2. **Books Module**

#### a) **BookStore (State Management)**

- Stores the books data (`books`, `privateBooks`).
- Manages UI interactions like opening or closing the "Add Book Modal".
- Includes methods to:
    - Fetch books (`fetchBooks`).
    - Add books (`addBook`).
    - Toggle UI elements (`toggleAddBookModal`).

Located in `BooksStore.ts`.

#### b) **BookService (API Service)**
- Defines methods to interact with the backend API:
    - Fetch all books (`fetchBooks`).
    - Add a new book (`addBook`).
    - Fetch private books (`fetchPrivateBooks`).

Located in `BooksService.ts`.

#### c) **Books Types**
- Defines types and enums used across the Books module:
    - `IBook` - Represents a book object.
    - `IAddBookPayload` - Represents the payload for adding a book.
    - `EbooksType` - Enum for filtering books (`ALL`, `PRIVATE`).

Located in `Books.types.ts`.

#### d) **Components**
- **BooksPage**:
    - Main page for managing books.
    - Displays tabs (`BooksTabs`), actions (like "Add Book" button), and the books list (`BookList`).
- **BookList**:
    - Displays fetched books from the store.
    - Observes changes in the `BookStore` using `mobx-react`.

---

### 3. **ApiGateway**

A reusable class for handling HTTP requests with methods like `get`, `post`, `put`, and `request`. Key responsibilities:
- Defines the API base URL using `REACT_APP_API_BASE`.
- Handles HTTP response and error management globally.
- Used by services like `BookService` to fetch data from the backend.

Located in `ApiGateway.ts`.

---

### 4. **How to Run the Project**

1. **Setup Environment Variables**
    - Create a `.env` file in the root directory and define the `REACT_APP_API_BASE`. For example:
      ```dotenv
      REACT_APP_API_BASE=https://tdd.demo.reaktivate.com/v1
      ```

2. **Install Dependencies**
    - Run the following command to install dependencies:
      ```bash
      npm install
      ```

3. **Start the Application**
    - Use the following command to start the development server:
      ```bash
      npm start
      ```

4. **Build the Application**
    - To build the production version, run:
      ```bash
      npm run build
      ```

---

### 5. **Project Dependencies**

Key dependencies include:

- **React** (v16.8.6): UI framework.
- **MobX** (v6.3.10): State management library.
- **MobX React** (v7.2.1): Integration of MobX with React.
- **React-Scripts** (v3.0.1): Build tools and configurations.

---

### 6. **Testing**

- This project relies on React's default testing framework with `jest` typings included. Run tests using:
  ```bash
  npm test
  ```

---

### 7. **Future Improvements**

- Implement proper error handling in the `BookStore` for failed API calls.
- Add tests for:
    - Store methods.
    - API Service methods.
- Improve UI/UX by adding loading indicators and user feedback for API operations.

---

## Developer Notes

- **Environment Sensitivity**: The application heavily depends on the `REACT_APP_API_BASE` variable. Ensure it is correctly set before running in any environment.
- **Code Management**: Always use MobX's `runInAction` when updating observable values asynchronously.
- **Debugging Tips**: Utilize console logs in the `ApiGateway` methods for debugging request-related issues.

---