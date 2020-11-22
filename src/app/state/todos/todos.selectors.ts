import {createFeatureSelector, createSelector} from "@ngrx/store";
import {selectAllTodos, TodosState} from './todos.reducer';

const selectTodosState = createFeatureSelector<TodosState>('todos');

export const selectTodos =
    createSelector(
        selectTodosState,
        selectAllTodos
    );

export const selectCurrentTodoId =
    createSelector(
        selectTodosState,
        (state) => state.selectedTodoId
    );

export const selectCompletedTodosCount =
    createSelector(
        selectTodos,
        todos => todos.reduce((acc, { completed }) => acc + +completed, 0)
    );
