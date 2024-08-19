import { tasksObjType } from "../App";
import { TasksType } from "../TodoList";
import { AddTodoListAction, RemoveTodoListAction } from "./todo-reducer";

import { v1 } from "uuid";

export type RemoveTask = {
  type: "REMOVE-TASK";
  taskId: string;
  todolistId: string;
};
export type AddTask = {
  type: "ADD-TASK";
  title: string;
  todolistId: string;
};
export type ChangeTaskStatus = {
  type: "CHANGE-TASK-STATUS";
  taskId: string;
  todolistId: string;
  isDone: boolean;
};
export type ChangeTitleStatus = {
  type: "CHANGE-TITLE-STATUS";
  taskId: string;
  todolistId: string;
  title: string;
};
type Actions =
  | RemoveTask
  | AddTask
  | ChangeTaskStatus
  | ChangeTitleStatus
  | AddTodoListAction
  | RemoveTodoListAction;

export const tasksReducer = (
  state: tasksObjType,
  action: Actions
): tasksObjType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const copyState = { ...state };
      // достать таску по айди из экшена
      const tasks = state[action.todolistId];
      const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
      //  в новый стейт тольк отфильтрованные таски
      copyState[action.todolistId] = filteredTasks;
      return copyState;
    }
    case "ADD-TASK": {
      const copyState = {
        ...state,
      };
      // получить массив тасок,в который нкжно добавить новую таску
      const tasks = copyState[action.todolistId];
      //формируем эту новую таску
      let newTask = { id: v1(), title: action.title, isDone: false };
      // новый массив, в к-ом есть новая таска
      const newTasks = [newTask, ...tasks];
      //изначальному массиву присваиваем новый(с новой таской)
      copyState[action.todolistId] = newTasks;
      return copyState;
    }
    case "CHANGE-TASK-STATUS": {
      const copyState = {
        ...state,
      };
      const tasks = copyState[action.todolistId];

      let task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.isDone = action.isDone;
      }
      return copyState;
    }
    case "CHANGE-TITLE-STATUS": {
      const copyState = {
        ...state,
      };
      const tasks = copyState[action.todolistId];

      let task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.title = action.title;
      }
      return copyState;
    }
    case "ADD-TODOLIST": {
      const copyState = {
        ...state,
      };
      copyState[action.tolistId] = [];
      return copyState;
    }
    case "REMOVE-TODOLIST": {
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }
    default:
      throw new Error("???");
  }
};

export const removeTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTask => {
  return { type: "REMOVE-TASK", taskId, todolistId };
};
export const addTaskAC = (title: string, todolistId: string): AddTask => {
  return { type: "ADD-TASK", title, todolistId };
};
export const changeTaskStatusAC = (
  taskId: string,
  todolistId: string,
  isDone: boolean
): ChangeTaskStatus => {
  return { type: "CHANGE-TASK-STATUS", taskId, todolistId, isDone };
};
export const changeTaskTitleAC = (
  taskId: string,
  todolistId: string,
  title: string
): ChangeTitleStatus => {
  return { type: "CHANGE-TITLE-STATUS", taskId, todolistId, title };
};
