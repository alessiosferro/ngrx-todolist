import {Action} from "@ngrx/store";
import {Todo, Todos} from "../../model";

export enum TodosActionTypes {
    AddTodo = '[Todos] Add Todo',
    TodoAdded = '[Todos] Todo Added',

    UpdateTodo = '[Todos] Update Todo',
    TodoUpdated = '[Todos] Todo Updated',

    DeleteTodo = '[Todos] Delete Todo',
    TodoDeleted = '[Todos] Todo Deleted',

    LoadTodos = '[Todos] Load Todos',
    TodosLoaded = '[Todos] Todos Loaded',

    SelectTodo = '[Todos] Select Todo',
    TodoSelected = '[Todos] Todo Selected'
}

export class AddTodo implements Action {
    public readonly type = TodosActionTypes.AddTodo;
    constructor(public payload: string) {}
}

export class TodoAdded implements Action {
    public readonly type = TodosActionTypes.TodoAdded;
    constructor(public payload: Todo) {}
}

export class UpdateTodo implements Action {
    public readonly type = TodosActionTypes.UpdateTodo;
    constructor(public payload: Todo) {}
}

export class TodoUpdated implements Action {
    public readonly type = TodosActionTypes.TodoUpdated;
    constructor(public payload: Todo) {}
}

export class DeleteTodo implements Action {
    public readonly type = TodosActionTypes.DeleteTodo;
    constructor(public payload: string) {}
}

export class TodoDeleted implements Action {
    public readonly type = TodosActionTypes.TodoDeleted;
    constructor(public payload: string) {}
}

export class LoadTodos implements Action {
    public readonly type = TodosActionTypes.LoadTodos;
}

export class TodosLoaded implements Action {
    public readonly type = TodosActionTypes.TodosLoaded;
    constructor(public payload: Todos) {}
}

export class SelectTodo implements Action {
    public readonly type = TodosActionTypes.SelectTodo;
    constructor(public payload: string | null) {}
}

export class TodoSelected implements Action {
    public readonly type = TodosActionTypes.TodoSelected;
    constructor(public payload: string) {}
}

export type TodosActions =
    AddTodo |
    UpdateTodo |
    DeleteTodo |
    SelectTodo |
    LoadTodos |
    TodoAdded |
    TodoUpdated |
    TodoDeleted |
    TodoSelected |
    TodosLoaded;
