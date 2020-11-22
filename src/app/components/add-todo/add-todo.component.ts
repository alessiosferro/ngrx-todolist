import {Component, Input} from '@angular/core';
import {AddTodo} from "../../state/todos/todos.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../model/app-state.model";

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {
  @Input()
  readonly completedTodosCount: number;

  constructor(
      private store: Store<AppState>
  ) { }

  addTodo(element: HTMLInputElement): void {
    const { value: title } = element;
    this.store.dispatch(new AddTodo(title.trim()));
    element.value = '';
  }
}
