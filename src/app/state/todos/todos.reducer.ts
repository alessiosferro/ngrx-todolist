import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Todo} from "../../model";
import {TodosActions, TodosActionTypes} from "./todos.actions";

export interface TodosState extends EntityState<Todo> {
    selectedTodoId: string | null;
}

const adapter = createEntityAdapter<Todo>();

const initialState: TodosState = adapter.getInitialState({
    selectedTodoId: null
});

export const {
    selectAll: selectAllTodos,
    selectEntities: selectTodoEntities,
    selectIds: selectTodoIds
} = adapter.getSelectors();

function reducer(state: TodosState = initialState, action: TodosActions): TodosState {
    switch(action.type) {
        case TodosActionTypes.TodoAdded:
            return adapter.addOne(action.payload, state);

        case TodosActionTypes.TodoUpdated:
            return adapter.updateOne({ id: action.payload.id, changes: action.payload }, state);

        case TodosActionTypes.TodosLoaded:
            return adapter.addMany(action.payload, state);

        case TodosActionTypes.TodoDeleted:
            return adapter.removeOne(action.payload, state);

        case TodosActionTypes.TodoSelected:
            return {
                entities: {...state.entities},
                ids: [...state.ids] as string[],
                selectedTodoId: action.payload
            }
    }

    return state;
}

export default reducer;
