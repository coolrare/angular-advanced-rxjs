import { TodoItemStatusChangeEvent } from './../todo-item-status-change-event';
import { PageChangeEvent } from './../page-change-event';
import { SortChangeEvent } from './../sort-change-event';
import { TodoItem } from './../todo-item';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-todo-list-table',
  templateUrl: './todo-list-table.component.html',
  styleUrls: ['./todo-list-table.component.css'],
})
export class TodoListTableComponent implements OnInit {
  @Input() todoList: TodoItem[] = [];
  @Input() pageIndex = 1;
  @Input() pageSize = 10;
  @Input() totalCount = 0;

  @Output() todoItemStatusChange =
    new EventEmitter<TodoItemStatusChangeEvent>();

  @Output() todoItemDelete = new EventEmitter<string>();

  @Output() sortChange = new EventEmitter<SortChangeEvent>();

  @Output() pageChange = new EventEmitter<PageChangeEvent>();

  @Output() refreshClick = new EventEmitter();

  displayedColumns = ['id', 'done', 'text', 'created', 'action'];

  constructor() {}

  ngOnInit(): void {}

  sort(sortData: Sort) {
    this.sortChange.emit({
      sortColumn: sortData.active as keyof TodoItem,
      sortDirection: sortData.direction,
    });
  }

  page(pageEvent: PageEvent) {
    this.pageChange.emit({
      pageNumber: pageEvent.pageIndex,
      pageSize: pageEvent.pageSize,
    });
  }

  changeTodoStatus(id: string, changeStatus: MatCheckboxChange) {
    this.todoItemStatusChange.emit({
      id,
      done: changeStatus.checked,
    });
  }

  deleteTodo(id: string) {
    this.todoItemDelete.emit(id);
  }

  refresh() {
    this.refreshClick.emit();
  }
}
