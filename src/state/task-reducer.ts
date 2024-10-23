import { TasksList } from "../AppWithRedux";
import { TasksType } from "../TodoList";
import {
  AddTodoListAction,
  RemoveTodoListAction,
  todoListId1,
  todoListId2,
} from "./todo-reducer";

import { v1 } from "uuid";

// типы акшенов
export type RemoveTask = {
  type: "REMOVE-TASK";
  taskId: string;
  todoListId: string;
};
export type AddTask = {
  type: "ADD-TASK";
  title: string;
  todoListId: string;
};
export type ChangeTaskStatus = {
  type: "CHANGE-TASK-STATUS";
  taskId: string;
  todoListId: string;
  isDone: boolean;
};
export type ChangeTaskValue = {
  type: "CHANGE-TASK-VALUE";
  taskId: string;
  todoListId: string;
  taskValue: string;
};
type Actions =
  | RemoveTask
  | AddTask
  | ChangeTaskStatus
  | ChangeTaskValue
  | AddTodoListAction
  | RemoveTodoListAction;

// TODO:изначальный стейт, убрать
const initialState: TasksList = {
  [todoListId1]: [
    { id: v1(), title: "Learn JS", isDone: false },
    { id: v1(), title: "Learn React", isDone: true },
    { id: v1(), title: "Learn ", isDone: true },
  ],
  [todoListId2]: [
    { id: v1(), title: "Book", isDone: false },
    { id: v1(), title: "Cheir", isDone: true },
  ],
};

export const tasksReducer = (
  state: TasksList = initialState,
  action: Actions
): TasksList => {
  const stateCopy = { ...state };

  const getTasks = (state: TasksList, todoListId: string) => state[todoListId] || [];
  const updateTasks = (tasks: TasksType[], todoListId: string) => {
    stateCopy[todoListId] = tasks;
  };
 
  switch (action.type) {
    case "REMOVE-TASK": {
      const tasks = getTasks(state, action.todoListId);
      const filteredTasks = tasks.filter((task) => task.id !== action.taskId);
      updateTasks(filteredTasks, action.todoListId);
      return stateCopy;
    }

    case "ADD-TASK": {
      const tasks = getTasks(state, action.todoListId);
      const newTask = { id: v1(), title: action.title, isDone: false };
      const newTasks = [newTask, ...tasks];
      updateTasks(newTasks, action.todoListId);
      return stateCopy;
    }

    case "CHANGE-TASK-STATUS": {
      const tasks = getTasks(state, action.todoListId);
      const updatedTasks = tasks.map((task) =>
        task.id === action.taskId ? { ...task, isDone: action.isDone } : task
      );
      updateTasks(updatedTasks, action.todoListId);
      return stateCopy;
    }

    case "CHANGE-TASK-VALUE": {
      const tasks = getTasks(state, action.todoListId);
      const updatedTasks = tasks.map((task) =>
        task.id === action.taskId ? { ...task, title: action.taskValue } : task
      );
      updateTasks(updatedTasks, action.todoListId);
      return stateCopy;
    }

    case "ADD-TODOLIST": {
      stateCopy[action.tolistId] = [];
      return stateCopy;
    }

    case "REMOVE-TODOLIST": {
      delete stateCopy[action.id];
      return stateCopy;
    }

    default:
      return state;
  }
};


export const removeTaskAC = (
  taskId: string,
  todoListId: string
): RemoveTask => {
  return { type: "REMOVE-TASK", taskId, todoListId };
};
export const addTaskAC = (title: string, todoListId: string): AddTask => {
  return { type: "ADD-TASK", title, todoListId: todoListId };
};
export const changeTaskStatusAC = (
  taskId: string,
  todoListId: string,
  isDone: boolean
): ChangeTaskStatus => {
  return { type: "CHANGE-TASK-STATUS", taskId, todoListId, isDone };
};
export const changeTaskValueAC = (
  taskId: string,
  todoListId: string,
  taskValue: string
): ChangeTaskValue => {
  return {
    type: "CHANGE-TASK-VALUE",
    taskId,
    todoListId,
    taskValue: taskValue,
  };
};
