import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import {Todo} from "../../model";
import {DeleteTodo, SelectTodo, UpdateTodo} from "../../state/todos/todos.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../model/app-state.model";
import {BehaviorSubject, Subject, timer} from "rxjs";
import {filter, switchMap, takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-todo-list-item',
    templateUrl: './todo-list-item.component.html',
    styleUrls: ['./todo-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListItemComponent implements OnInit, OnChanges, OnDestroy {
    private destroy$ = new Subject();
    private isCurrentTodoSelected = new BehaviorSubject(false);

    @ViewChild('editInput', { static: true })
    input: ElementRef<HTMLInputElement>;

    @Input()
    todo: Todo;

    @Input()
    selectedTodoId: string | null;

    constructor(
        private store: Store<AppState>
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        const isCurrentTodoSelected = changes.selectedTodoId.currentValue == this.todo.id;
        this.isCurrentTodoSelected.next(isCurrentTodoSelected);
    }

    ngOnInit() {
        this.isCurrentTodoSelected.pipe(
            filter(value => value),
            switchMap(() => timer(0)),
            takeUntil(this.destroy$)
        ).subscribe(() => {
            this.input.nativeElement.focus()
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    selectTodo(todoId: string | null): void {
        this.store.dispatch(new SelectTodo(todoId));
    }

    updateTodo(todo: Todo, resetSelectionState = false): void {
        this.store.dispatch(new UpdateTodo(todo));

        if (resetSelectionState) {
            this.store.dispatch(new SelectTodo(null));
        }
    }

    deleteTodo(todoId: string): void {
        this.store.dispatch(new DeleteTodo(todoId));
    }
}
