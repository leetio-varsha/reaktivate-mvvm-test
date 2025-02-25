import React, { useState } from "react";
import Modal from "components/Modal";
import { observer } from "mobx-react";
import BooksController from "features/books/controllers/BooksController";
import { generateUniqueId } from "utils/generateUniqueId";

import "./BookAddModal.css";

export const BookAddModal = observer(() => {
  const isModalOpen = BooksController.getAddBookModalIsOpen();

  const [formValues, setFormValues] = useState({
    name: "",
    author: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    author: "",
  });

  const validateForm = () => {
    const errors: { name: string; author: string } = {
      name: "",
      author: "",
    };

    if (!formValues.name.trim()) {
      errors.name = "Book name is required.";
    }

    if (!formValues.author.trim()) {
      errors.author = "Author name is required.";
    }

    setFormErrors(errors);

    return !errors.name && !errors.author;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle Save
  const handleSave = async () => {
    if (validateForm()) {
      const newBook = {
        name: formValues.name,
        author: formValues.author,
        id: generateUniqueId(),
      };
      await BooksController.addBook(newBook);
    }
  };

  return (
    <Modal
      visible={isModalOpen}
      title="Add Book"
      onClose={() => {
        BooksController.toggleAddBookModal(false);
      }}
      onConfirm={handleSave}
      confirmButtonText="Save"
      closeButtonText="Cancel"
    >
      <div className="book-add-modal">
        <form>
          <div>
            <label htmlFor="name">Book Name:</label>
            <input id="name" type="text" name="name" value={formValues.name} onChange={handleChange} />
            {formErrors.name && <span>{formErrors.name}</span>}
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input id="author" type="text" name="author" value={formValues.author} onChange={handleChange} />
            {formErrors.author && <span>{formErrors.author}</span>}
          </div>
        </form>
      </div>
    </Modal>
  );
});
