import {Component, Input,} from '@angular/core';
import {Todos} from "../../model";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input()
  todos: Todos | null;

  @Input()
  selectedTodoId: string | null;

  @Input()
  completedTodosCount: number | null;

  updateTodos(todos: Todos) {
    console.log(todos);
  }
}
