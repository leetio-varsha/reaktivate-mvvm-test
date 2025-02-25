import { EbooksType, TFilterType } from "types/Books.types";

export const BOOKS_TABS_OPTIONS: { label: string; value: TFilterType }[] = [
  { label: "All Books", value: EbooksType.ALL },
  { label: "Private Books", value: EbooksType.PRIVATE },
];
