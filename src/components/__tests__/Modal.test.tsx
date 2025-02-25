import React from "react";
import ReactDOM from "react-dom";
import Modal from "components/Modal";

describe("Modal Component Tests", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null!;
  });

  it("renders the modal when visible is true", () => {
    ReactDOM.render(
      <Modal visible={true} onClose={jest.fn()}>
        Modal Content
      </Modal>,
      container
    );

    const modal = container.querySelector(".modal-container");
    expect(modal).not.toBeNull();
  });

  it("does not render the modal when visible is false", () => {
    ReactDOM.render(
      <Modal visible={false} onClose={jest.fn()}>
        Modal Content
      </Modal>,
      container
    );

    const modal = container.querySelector(".modal-container");
    expect(modal).toBeNull();
  });

  it("renders the title when provided", () => {
    const title = "Test Modal";
    ReactDOM.render(
      <Modal visible={true} onClose={jest.fn()} title={title}>
        Modal Content
      </Modal>,
      container
    );

    const titleElement = container.querySelector(".modal-title");
    expect(titleElement).not.toBeNull();
    expect(titleElement?.textContent).toBe(title);
  });

  it("renders children content correctly", () => {
    const content = "This is the modal content.";
    ReactDOM.render(
      <Modal visible={true} onClose={jest.fn()}>
        {content}
      </Modal>,
      container
    );

    const contentElement = container.querySelector(".modal-content");
    expect(contentElement).not.toBeNull();
    expect(contentElement?.textContent).toBe(content);
  });

  it("triggers onClose when the close button is clicked", () => {
    const onCloseMock = jest.fn();
    ReactDOM.render(
      <Modal visible={true} onClose={onCloseMock} closeButtonText="Close">
        Modal Content
      </Modal>,
      container
    );

    const closeButton = container.querySelector(".modal-close-button") as HTMLButtonElement;

    expect(closeButton).not.toBeNull();

    closeButton?.click();

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("renders and triggers onConfirm when provided", () => {
    const onConfirmMock = jest.fn();
    ReactDOM.render(
      <Modal visible={true} onClose={jest.fn()} onConfirm={onConfirmMock} confirmButtonText="Confirm">
        Modal Content
      </Modal>,
      container
    );

    const confirmButton = container.querySelector(".modal-confirm-button") as HTMLButtonElement;
    expect(confirmButton).not.toBeNull();

    confirmButton?.click();

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });

  it("does not render the confirm button when onConfirm is not provided", () => {
    ReactDOM.render(<Modal visible={true} onClose={jest.fn()} />, container);

    const confirmButton = container.querySelector(".modal-confirm-button");
    expect(confirmButton).toBeNull();
  });

  it("closes the modal when clicking on the overlay", () => {
    const onCloseMock = jest.fn();
    ReactDOM.render(<Modal visible={true} onClose={onCloseMock} />, container);

    const overlay = container.querySelector(".modal-overlay") as HTMLButtonElement;

    expect(overlay).not.toBeNull();

    overlay?.click();

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("does not trigger onClose when clicking inside the modal", () => {
    const onCloseMock = jest.fn();
    ReactDOM.render(
      <Modal visible={true} onClose={onCloseMock}>
        Modal Content
      </Modal>,
      container
    );

    const modalContainer = container.querySelector(".modal-container") as HTMLButtonElement;

    expect(modalContainer).not.toBeNull();

    modalContainer?.click();

    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it("renders custom text for the close and confirm buttons", () => {
    const closeButtonText = "Dismiss";
    const confirmButtonText = "Agree";
    ReactDOM.render(
      <Modal
        visible={true}
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        closeButtonText={closeButtonText}
        confirmButtonText={confirmButtonText}
      >
        Modal Content
      </Modal>,
      container
    );

    const closeButton = container.querySelector(".modal-close-button");
    const confirmButton = container.querySelector(".modal-confirm-button");

    expect(closeButton).not.toBeNull();
    expect(closeButton?.textContent).toBe(closeButtonText);

    expect(confirmButton).not.toBeNull();
    expect(confirmButton?.textContent).toBe(confirmButtonText);
  });
});
