import { Pagination } from './pagination';
import { SortDirection } from './sort-direction';
import { TodoItem } from './todo-item';
import {
  ascend, defaultValue, descend, equals, filter, ifElse, includes, isEmpty, length, Ord, pipe,
  prop, sort, take,
  takeLast, toLower
} from './utils';

const buildFilterFn = (keyword: string) => {
  const getTextColumnData = prop<string>('text');
  const hasKeyword = includes(toLower(keyword));
  const itemContainsKeyword = pipe<TodoItem, boolean>(
    getTextColumnData,
    toLower,
    hasKeyword
  );

  const filterByKeyword = ifElse(
    (_: any) => isEmpty(defaultValue<string, string>('')(keyword)),
    (_: any) => true,
    itemContainsKeyword
  );

  return filter<TodoItem>(filterByKeyword);
};

export const buildSortFn = (
  sortColumn: keyof TodoItem,
  sortDirection: SortDirection
) => {
  const getSortColumn = prop<string>(sortColumn);

  const byColumnAsc = ascend<TodoItem>(getSortColumn);
  const byColumnDesc = descend<TodoItem>(getSortColumn);
  const byColumn = ifElse<any, Ord, Ord>(
    () => equals('asc', sortDirection),
    byColumnAsc,
    byColumnDesc
  );
  const sortFn = sort<TodoItem>(byColumn);
  return sortFn;
};

export const todoListSearch = (
  keyword: string,
  pageNumber: number,
  pageSize: number,
  sortColumn: keyof TodoItem,
  sortDirection: SortDirection,
  dataSource: TodoItem[]
): Pagination<TodoItem> => {
  // 篩選
  const filterFn = buildFilterFn(keyword);

  // 排序
  const sortFn = buildSortFn(sortColumn, sortDirection);

  // 分頁
  const paginationFn = pipe<TodoItem[], TodoItem[]>(
    take(pageNumber * pageSize),
    takeLast(pageSize)
  );

  // 組合所有 functions
  const fn = pipe<TodoItem[], TodoItem[]>(filterFn, sortFn, paginationFn);

  // console.log(length(filterFn(dataSource)));
  console.log(fn(dataSource));
  return {
    totalCount: length(filterFn(dataSource)),
    data: fn(dataSource),
  };
};
