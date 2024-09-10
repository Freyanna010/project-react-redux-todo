import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";

export type RemoveTodoListAction = {
  type: "REMOVE-TODOLIST";
  id: string;
};
export type AddTodoListAction = {
  type: "ADD-TODOLIST";
  title: string;
  tolistId: string;
};
export type ChangeTodoListTitleAction = {
  type: "CHANGE-TODO-LIST-TITLE";
  id: string;
  title: string;
};
export type ChangeTodoListFilterAction = {
  type: "CHANGE-TODO-LIST-FILTER";
  id: string;
  filter: FilterValuesType;
};
type Actions =
  | RemoveTodoListAction
  | AddTodoListAction
  | ChangeTodoListTitleAction
  | ChangeTodoListFilterAction;

export const todoReducer = (
  state: Array<TodoListType>,
  action: Actions
): Array<TodoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((t) => t.id !== action.id);
    }
    case "ADD-TODOLIST": {
      return [
        ...state,
        {
          id: action.tolistId,
          title: action.title,
          filter: "all",
        },
      ];
    }
    case "CHANGE-TODO-LIST-TITLE": {
      let todoList = state.find((tl) => tl.id === action.id);
      if (todoList) {
        todoList.title = action.title;
      }
      return [...state];
    }
    case "CHANGE-TODO-LIST-FILTER": {
      let todoList = state.find((tl) => tl.id === action.id);
      if (todoList) {
        todoList.filter = action.filter;
      }
      return [...state];
    }
    default:
      throw new Error("???");
  }
};

// генерируют  правильные объекты - вызoвем вместо  описания  экшена - функции фабрики- акшен криейтеры
// принимает параметры для того чтобы сформировать правильный объект
export const removeTodoListAC = (todolistId: string): RemoveTodoListAction => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};
export const addTodoListAC = (title: string): AddTodoListAction => {
  // генирируем  новый айди здесь
  return { type: "ADD-TODOLIST", title, tolistId: v1() };
};
export const changeTodoListTitleAC = (
  id: string,
  title: string
): ChangeTodoListTitleAction => {
  return { type: "CHANGE-TODO-LIST-TITLE", id, title };
};
export const changeTodoListFilterAC = (
  id: string,
  filter: FilterValuesType
): ChangeTodoListFilterAction => {
  return { type: "CHANGE-TODO-LIST-FILTER", id, filter };
};
