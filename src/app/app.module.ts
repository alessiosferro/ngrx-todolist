import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {StoreModule} from "@ngrx/store";
import reducers from "./state";
import {EffectsModule} from "@ngrx/effects";
import {TodosEffects} from "./state/todos/todos.effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {FormsModule} from "@angular/forms";
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoListItemComponent } from './components/todo-list-item/todo-list-item.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';

@NgModule({
    declarations: [
        AppComponent,
        TodoListComponent,
        TodoListItemComponent,
        AddTodoComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument(),
        EffectsModule.forRoot([
            TodosEffects
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
