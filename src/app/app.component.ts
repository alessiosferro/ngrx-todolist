import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnInit,
    QueryList,
    ViewChildren
} from '@angular/core';
import {Observable} from "rxjs";
import {Todo} from "./model";
import {select, Store} from "@ngrx/store";
import {AppState} from "./model/app-state.model";
import {selectCompletedTodosCount, selectCurrentTodoId, selectTodos} from "./state/todos/todos.selectors";
import {AddTodo, DeleteTodo, LoadTodos, SelectTodo, UpdateTodo} from "./state/todos/todos.actions";
import {filter, pluck} from "rxjs/operators";

@Component({
    selector: 'app-root',
    template: `
        <ul>
            <li *ngFor="let todo of todos$ | async">
                <ng-container *ngIf="(selectedTodoId$ | async) === todo.id; else showTodo">
                    <form (ngSubmit)="updateTodo({ id: todo.id, title: editInput.value, completed: completed.checked })">
                        <input #editInput type="text" name="title" [ngModel]="todo.title"/>
                        <input #completed name="completed" type="checkbox" [ngModel]="todo.completed"/>
                        <button>Edit</button>
                    </form>
                </ng-container>
                <ng-template #showTodo>
                    <a href="#"
                       (click)="selectTodo(todo.id)"
                       [ngStyle]="{ textDecoration: todo.completed ? 'line-through' : 'none'}"
                    >{{ todo.title }}</a>
                    <button (click)="deleteTodo(todo.id)">Delete</button>
                </ng-template>
            </li>
        </ul>
        <h3>Todos completed: {{ completedTodosCount$ | async }}</h3>
        <form (ngSubmit)="addTodo(input.value.trim()); input.value = ''">
            <input type="text" name="todoTitle" #input/>
            <button>Submit</button>
        </form>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {
    @ViewChildren('editInput')
    editInput: QueryList<HTMLInputElement>;

    todos$: Observable<Todo[]>;
    selectedTodoId$: Observable<string | null>;
    completedTodosCount$: Observable<number>;

    constructor(
        private store: Store<AppState>
    ) {
    }

    ngOnInit() {
        this.store.dispatch(new LoadTodos());

        this.todos$ = this.store.pipe(
            select(selectTodos)
        );

        this.selectedTodoId$ = this.store.pipe(
            select(selectCurrentTodoId)
        );

        this.completedTodosCount$ = this.store.pipe(
            select(selectCompletedTodosCount)
        );
    }

    ngAfterViewInit() {
        this.editInput.changes.pipe(
            pluck('first', 'nativeElement'),
            filter(el => !!el)
        ).subscribe(el => el.focus());
    }

    addTodo(title: string): void {
        this.store.dispatch(new AddTodo(title));
    }

    selectTodo(todoId: string): void {
        this.store.dispatch(new SelectTodo(todoId));
    }

    updateTodo(todo: Todo): void {
        this.store.dispatch(new UpdateTodo(todo));
    }

    deleteTodo(todoId: string): void {
        this.store.dispatch(new DeleteTodo(todoId));
    }
}
