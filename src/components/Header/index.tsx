import React from "react";
import { BookPrivateCounter } from "features/books/components/BookPrivateCounter";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <BookPrivateCounter />
    </header>
  );
};

export default Header;
