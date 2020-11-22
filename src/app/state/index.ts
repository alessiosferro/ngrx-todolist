import todosReducer from './todos/todos.reducer';
import {ActionReducerMap} from "@ngrx/store";
import {AppState} from "../model/app-state.model";
import {TodosActions} from "./todos/todos.actions";

const reducers: ActionReducerMap<AppState, TodosActions> = {
    todos: todosReducer
}

export default reducers;
