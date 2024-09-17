import { todoReducer } from "./todo-reducer";
import { tasksReducer } from "./task-reducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

//обьеденить редьюсеры
// он расскидывает экшен по редьюсерам
// в него будут уходить диспачи
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch  = typeof store.dispatch

export const rootReducer = combineReducers({
  todoList: todoReducer,
  tasks: tasksReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
// window.store = store;
