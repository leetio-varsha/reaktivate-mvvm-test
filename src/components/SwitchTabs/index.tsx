import React from "react";
import "./SwitchTabs.css";

interface Tab<T> {
  label: string;
  value: T;
}

interface SwitchTabsProps<T> {
  tabs: Tab<T>[];
  activeTab: T;
  onTabSwitch: (value: T) => void;
}

const SwitchTabs = <T,>({ tabs, activeTab, onTabSwitch }: SwitchTabsProps<T>) => {
  return (
    <div className="switch-tabs-container">
      {tabs.map((tab) => (
        <button
          key={String(tab.value)}
          onClick={() => onTabSwitch(tab.value)}
          className={`switch-tab ${activeTab === tab.value ? "active" : ""}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SwitchTabs;
