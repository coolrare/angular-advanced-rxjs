import { UntypedFormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-list-add-dialog',
  templateUrl: './todo-list-add-dialog.component.html',
  styleUrls: ['./todo-list-add-dialog.component.css']
})
export class TodoListAddDialogComponent implements OnInit {

  todoText = new UntypedFormControl('', Validators.required);

  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }

  addTodoItem() {
    if(this.todoText.valid){
      this.dialogRef.close(this.todoText.value);
    }
  }

}
