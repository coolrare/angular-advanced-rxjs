import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageChangeEvent } from './page-change-event';
import { SortChangeEvent } from './sort-change-event';
import { TodoItem } from './todo-item';
import { TodoItemStatusChangeEvent } from './todo-item-status-change-event';
import { TodoListAddDialogComponent } from './todo-list-add-dialog/todo-list-add-dialog.component';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  suggestList: string[] = [];

  totalCount = 0;
  todoList: TodoItem[] = [];

  keyword = '';
  sort: SortChangeEvent = {
    sortColumn: 'created',
    sortDirection: 'desc'
  };
  pagination: PageChangeEvent = {
    pageNumber: 1,
    pageSize: 10
  };

  loading = false;

  constructor(
    private todoListService: TodoListService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refreshTodoList();
  }

  setSuggestList(keyword: string) {
    this.todoListService.getSuggestList(keyword).subscribe((result) => {
      this.suggestList = result;
    });
  }

  refreshTodoList() {
    this.loading = true;
    this.todoListService
      .getTodoList(
        this.keyword,
        this.pagination,
        this.sort
      )
      .subscribe({
        next: (result) => {
          this.totalCount = result.totalCount;
          this.todoList = result.data;
          this.loading = false;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.error.message);
        },
      });
  }

  sortChange(event: SortChangeEvent) {
    this.sort = { ...event };
    this.refreshTodoList();
  }

  refresh() {
    this.refreshTodoList();
  }

  pageChange(event: PageChangeEvent) {
    this.pagination = {
      pageNumber: event.pageNumber + 1,
      pageSize : event.pageSize
    };
    this.refreshTodoList();
  }

  displayTodoDialog() {
    this.dialog
      .open(TodoListAddDialogComponent)
      .afterClosed()
      .subscribe((text) => {
        if (text !== '') {
          this.todoListService.addTodo(text).subscribe((item) => {
            this.refreshTodoList();
          });
        }
      });
  }

  resetSortAndPage() {
    this.sort = {
      sortColumn: 'created',
      sortDirection: 'desc'
    };

    this.pagination = {
      pageNumber: 1,
      pageSize: 10
    };
  }

  search(keyword: string) {
    this.keyword = keyword;
    this.resetSortAndPage();
    this.refreshTodoList();
  }

  todoItemStatusChange(status: TodoItemStatusChangeEvent) {
    this.todoListService
      .updateTodoDoneStatus(status.id, status.done)
      .subscribe((item) => {
        this.refreshTodoList();
      });
  }

  todoItemDelete(id: string) {
    this.todoListService.deleteTodoItem(id).subscribe(() => {
      this.refreshTodoList();
    });
  }
}
