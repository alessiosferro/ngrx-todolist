import {ActionReducerMap} from "@ngrx/store";
import {AppState} from "../model/app-state.model";
import todosReducer from './todos/todos.reducer';

const reducers: ActionReducerMap<AppState> = {
    todos: todosReducer
}

export default reducers;
