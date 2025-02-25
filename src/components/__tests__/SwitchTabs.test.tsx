import React from "react";
import ReactDOM from "react-dom";
import SwitchTabs from "components/SwitchTabs";

describe("SwitchTabs Component", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null!;
  });

  it("renders the correct number of tabs", () => {
    const tabs = [
      { label: "Tab 1", value: "tab1" },
      { label: "Tab 2", value: "tab2" },
      { label: "Tab 3", value: "tab3" },
    ];
    const activeTab = "tab1";
    const onTabSwitch = jest.fn();

    ReactDOM.render(<SwitchTabs tabs={tabs} activeTab={activeTab} onTabSwitch={onTabSwitch} />, container);

    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(tabs.length);

    buttons.forEach((button, index) => {
      expect(button.textContent).toEqual(tabs[index].label);
    });
  });

  it("assigns the 'active' class to the correct tab", () => {
    const tabs = [
      { label: "Tab A", value: "tabA" },
      { label: "Tab B", value: "tabB" },
    ];
    const activeTab = "tabB";
    const onTabSwitch = jest.fn();

    ReactDOM.render(<SwitchTabs tabs={tabs} activeTab={activeTab} onTabSwitch={onTabSwitch} />, container);

    const buttons = container.querySelectorAll("button");

    buttons.forEach((button, index) => {
      const isActive = tabs[index].value === activeTab;
      expect(button.classList.contains("active")).toBe(isActive);
    });
  });

  it("calls 'onTabSwitch' with the correct value when a tab is clicked", () => {
    const tabs = [
      { label: "Tab X", value: "tabX" },
      { label: "Tab Y", value: "tabY" },
    ];
    const activeTab = "tabX";
    const onTabSwitch = jest.fn();

    ReactDOM.render(<SwitchTabs tabs={tabs} activeTab={activeTab} onTabSwitch={onTabSwitch} />, container);

    const buttons = container.querySelectorAll("button");

    // Simulate a click on the second tab
    buttons[1].click();

    expect(onTabSwitch).toHaveBeenCalledTimes(1);
    expect(onTabSwitch).toHaveBeenCalledWith("tabY");
  });

  it("renders no tabs when the tabs array is empty", () => {
    const tabs: { label: string; value: string }[] = [];
    const activeTab = "";
    const onTabSwitch = jest.fn();

    ReactDOM.render(<SwitchTabs tabs={tabs} activeTab={activeTab} onTabSwitch={onTabSwitch} />, container);

    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(0); // No buttons should be rendered
  });
});
