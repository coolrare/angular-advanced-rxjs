import { SortDirection } from "./sort-direction";
import { TodoItem } from "./todo-item";

export type SortChangeEvent = {
  sortColumn: keyof TodoItem;
  sortDirection: SortDirection;
}
