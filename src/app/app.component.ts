import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
} from '@angular/core';
import {Observable} from "rxjs";
import {Todo} from "./model";
import {select, Store} from "@ngrx/store";
import {AppState} from "./model/app-state.model";
import {selectCompletedTodosCount, selectCurrentTodoId, selectTodos} from "./state/todos/todos.selectors";
import {LoadTodos} from "./state/todos/todos.actions";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    todos$: Observable<Todo[]>;
    selectedTodoId$: Observable<string | null>;
    completedTodosCount$: Observable<number>;

    constructor(
        private store: Store<AppState>
    ) {}

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
}
