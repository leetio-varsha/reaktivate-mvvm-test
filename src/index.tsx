import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import "./styles.css";
import BooksPage from "./pages/BooksPage";
import Header from "./components/Header";

const App: React.FC = observer(() => {
  return (
    <div>
      <Header />
      <BooksPage />
    </div>
  );
});

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
