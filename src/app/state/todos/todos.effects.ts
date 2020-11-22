import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {
    SelectTodo,
    TodoAdded,
    TodoDeleted,
    TodosActionTypes,
    TodoSelected,
    TodosLoaded,
    TodoUpdated
} from "./todos.actions";
import {concatMap, map, mergeMap} from "rxjs/operators";
import { v4 as uuid } from 'uuid';
import {Todo, Todos} from "../../model";

@Injectable({
    providedIn: 'root'
})
export class TodosEffects {
    @Effect()
    addTodo$ = this.actions.pipe(
        ofType(TodosActionTypes.AddTodo),
        concatMap(({ payload: title }) => {
            return new Promise<Todo>(resolve => {
                setTimeout(() => {
                    resolve({
                        id: uuid(),
                        title,
                        completed: false
                    });
                }, 500);
            });
        }),
        map(todo => new TodoAdded(todo))
    );

    @Effect()
    loadTodos$ = this.actions.pipe(
        ofType(TodosActionTypes.LoadTodos),
        mergeMap(() => {
            return new Promise<Todos>(resolve => {
               const todos: Todos = [
                   { id: uuid(), title: 'Clean the house', completed: false },
                   { id: uuid(), title: 'Buy food', completed: true },
                   { id: uuid(), title: 'Study for exam', completed: false }
               ];
               resolve(todos);
            });
        }),
        map(todos => new TodosLoaded(todos))
    );

    @Effect()
    selectTodo$ = this.actions.pipe(
        ofType(TodosActionTypes.SelectTodo),
        mergeMap(({ payload: todoId }) => {
            return new Promise<string>(resolve => {
               resolve(todoId)
            });
        }),
        map(todoId => new TodoSelected(todoId))
    );

    @Effect()
    updateTodo$ = this.actions.pipe(
        ofType(TodosActionTypes.UpdateTodo),
        concatMap(({ payload: todo }) => {
            return new Promise<Todo>(resolve => {
                setTimeout(() => {
                    resolve(todo);
                }, 500);
            })
        }),
        map(todo => new TodoUpdated(todo))
    );

    @Effect()
    deleteTodo$ = this.actions.pipe(
        ofType(TodosActionTypes.DeleteTodo),
        concatMap(({ payload: todoId }) => {
            return new Promise<string>(resolve => {
                setTimeout(() => {
                    resolve(todoId)
                }, 500);
            });
        }),
        map((todoId) => new TodoDeleted(todoId))
    );

    constructor(
        private actions: Actions
    ) {}
}
