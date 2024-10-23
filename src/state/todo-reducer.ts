import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../AppWithRedux";

// TODO:вынести типищацию
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

export let todoListId1 = v1();
export let todoListId2 = v1();

const initialState:  Array<TodoListType> = [
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to but", filter: "all" },
  ]

  // TODO:нужна ли
  const updateTodoList = (
    stateCopy: Array<TodoListType>,
    id: string,
    changes: Partial<TodoListType>
  ): Array<TodoListType> => {
    const index = stateCopy.findIndex((todo) => todo.id === id);
    if (index > -1) {
      stateCopy[index] = { ...stateCopy[index], ...changes };
    }
    return stateCopy;
  };
  

  export const todoReducer = (
    state: Array<TodoListType> = initialState,
    action: Actions
  ): Array<TodoListType> => {
    const stateCopy = [...state];
  
    switch (action.type) {
      case "REMOVE-TODOLIST": {
        return stateCopy.filter((t) => t.id !== action.id);
      }
  
      case "ADD-TODOLIST": {
        return [
          {
            id: action.tolistId,
            title: action.title,
            filter: "all",
          },
          ...stateCopy,
        ];
      }
  
      case "CHANGE-TODO-LIST-TITLE": {
        return updateTodoList(stateCopy, action.id, { title: action.title });
      }
  
      case "CHANGE-TODO-LIST-FILTER": {
        return updateTodoList(stateCopy, action.id, { filter: action.filter });
      }
  
      default:
        return stateCopy;
    }
  };

export const removeTodoListAC = (todolistId: string): RemoveTodoListAction => {
  return { type: "REMOVE-TODOLIST", id: todolistId };};
export const addTodoListAC = (title: string): AddTodoListAction => {
  return { type: "ADD-TODOLIST", title, tolistId: v1() };
};
export const changeTodoListTitleAC = (
  id: string,
  title: string
): ChangeTodoListTitleAction => {
  return { type: "CHANGE-TODO-LIST-TITLE", id, title };
};
export const changeTodoListFilterAC = (
  filter: FilterValuesType,
  id: string
): ChangeTodoListFilterAction => {
  return { type: "CHANGE-TODO-LIST-FILTER", id, filter };
};
