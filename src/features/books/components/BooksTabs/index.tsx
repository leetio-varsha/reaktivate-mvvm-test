import React from "react";
import BookController from "features/books/controllers/BooksController";
import { TFilterType } from "types/Books.types";
import SwitchTabs from "components/SwitchTabs";
import { BOOKS_TABS_OPTIONS } from "features/books/constants/ui";
import { observer } from "mobx-react";

const BooksTabs = observer(() => {
  const switchTab = (type: TFilterType) => {
    void BookController.switchFilter(type);
  };
  const activeTab = BookController.getSelectedFilterType();

  const onTabSwitch = (value: TFilterType) => {
    switchTab(value);
  };

  return <SwitchTabs tabs={BOOKS_TABS_OPTIONS} activeTab={activeTab} onTabSwitch={onTabSwitch} />;
});

export default BooksTabs;
