import { TodoListService } from './../todo-list.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TodoItem } from '../todo-item';

@Component({
  selector: 'app-todo-list-search',
  templateUrl: './todo-list-search.component.html',
  styleUrls: ['./todo-list-search.component.css'],
})
export class TodoListSearchComponent implements OnInit {
  @Input() suggestList: string[] = [];

  @Output() searchClick = new EventEmitter<string>();
  @Output() keywordChange = new EventEmitter<string>();

  keywordControl = new UntypedFormControl();

  constructor() {}

  ngOnInit(): void {
    this.keywordControl.valueChanges.subscribe((keyword) => {
      this.keywordChange.emit(keyword);
    });
  }

  search() {
    this.searchClick.emit(this.keywordControl.value);
  }
}
