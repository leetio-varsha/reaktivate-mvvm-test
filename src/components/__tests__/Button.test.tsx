import React from "react";
import ReactDOM from "react-dom";
import Button from "components/Button";

describe("Button component", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null!;
  });

  it("renders the button with default props", () => {
    ReactDOM.render(<Button>Click Me</Button>, container);

    const button = container.querySelector("button");
    expect(button).not.toBeNull();
    expect(button?.textContent).toBe("Click Me");
    expect(button?.className).toContain("button primary");
    expect(button?.disabled).toBe(false);
  });

  it("applies the correct variant class", () => {
    ReactDOM.render(<Button variant="secondary">Secondary</Button>, container);

    const button = container.querySelector("button");
    expect(button).not.toBeNull();
    expect(button?.className).toContain("button secondary");
  });

  it("disables the button when `disabled` prop is true", () => {
    ReactDOM.render(<Button disabled>Disabled Button</Button>, container);

    const button = container.querySelector("button");
    expect(button?.disabled).toBe(true);
    expect(button?.className).toContain("button-disabled");
  });

  it("calls `onClick` when the button is clicked", () => {
    const onClickMock = jest.fn();
    ReactDOM.render(<Button onClick={onClickMock}>Clickable Button</Button>, container);

    const button = container.querySelector("button");
    button?.click();

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("does not call `onClick` when the button is disabled", () => {
    const onClickMock = jest.fn();
    ReactDOM.render(
      <Button onClick={onClickMock} disabled>
        Disabled Button
      </Button>,
      container
    );

    const button = container.querySelector("button");
    button?.click();

    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("applies additional custom classes passed in the `className` prop", () => {
    ReactDOM.render(<Button className="custom-class">Button with Custom Class</Button>, container);

    const button = container.querySelector("button");
    expect(button?.className).toContain("custom-class");
  });

  it("applies inline styles passed via `style` prop", () => {
    const customStyle = { color: "red" };
    ReactDOM.render(<Button style={customStyle}>Styled Button</Button>, container);

    const button = container.querySelector("button");
    expect(button?.style.color).toBe("red");
  });

  it("renders children passed to the button", () => {
    ReactDOM.render(
      <Button>
        <span>Child Element</span>
      </Button>,
      container
    );

    const child = container.querySelector("span");
    expect(child).not.toBeNull();
    expect(child?.textContent).toBe("Child Element");
  });
});
