import { tasksObjType } from "../AppWithRedux";
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
const initialState: tasksObjType = {
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

// export const tasksReducer = (
//   state: tasksObjType = initialState,
//   action: Actions
// ): tasksObjType => {
//   switch (action.type) {
//     case "REMOVE-TASK": {
//       const stateCopy = { ...state };

//       const tasks = stateCopy[action.todoListId];

//       const filteredTasks = tasks.filter((task) => task.id !== action.taskId);
//       stateCopy[action.todoListId] = filteredTasks;

//       return stateCopy;
//     }
//     case "ADD-TASK": {
//       const stateCopy = {
//         ...state,
//       };

//       const tasks = stateCopy[action.todoListId];

//       const newTask = { id: v1(), title: action.title, isDone: false };
//       const newTasks = [newTask, ...tasks];
//       stateCopy[action.todoListId] = newTasks;

//       return stateCopy;
//     }
//     case "CHANGE-TASK-STATUS": {
//       const stateCopy = { ...state };

//       const tasks = stateCopy[action.todoListId];

//       stateCopy[action.todoListId] = tasks.map((task) =>
//         task.id === action.taskId ? { ...task, isDone: action.isDone } : task
//       );

//       return stateCopy;
//     }
//     case "CHANGE-TASK-VALUE": {
//       const copyState = {
//         ...state,
//       };

//       const tasks = copyState[action.todoListId];

//       copyState[action.todoListId] = tasks.map((task) =>
//         task.id === action.taskId ? { ...task, title: action.taskValue } : task
//       );

//       return copyState;
//     }
//     case "ADD-TODOLIST": {
//       const stateCopy = {
//         ...state,
//       };

//       stateCopy[action.tolistId] = [];

//       return stateCopy;
//     }
//     case "REMOVE-TODOLIST": {
//       const copyState = { ...state };

//       delete copyState[action.id];

//       return copyState;
//     }
//     default:
//       return state;
//   }
// };

export const tasksReducer = (
  state: tasksObjType = initialState,
  action: Actions
): tasksObjType => {
  const copyState = { ...state };

  const getTasks = (state: tasksObjType, todoListId: string) => state[todoListId] || [];
  
  const updateTasks = (tasks: any, todoListId: string) => {
    copyState[todoListId] = tasks;
  };
 
  switch (action.type) {
    case "REMOVE-TASK": {
      const tasks = getTasks(state, action.todoListId);
      const filteredTasks = tasks.filter((task) => task.id !== action.taskId);
      updateTasks(filteredTasks, action.todoListId);
      return copyState;
    }

    case "ADD-TASK": {
      const tasks = getTasks(state, action.todoListId);
      const newTask = { id: v1(), title: action.title, isDone: false };
      const newTasks = [newTask, ...tasks];
      updateTasks(newTasks, action.todoListId);
      return copyState;
    }

    case "CHANGE-TASK-STATUS": {
      const tasks = getTasks(state, action.todoListId);
      const updatedTasks = tasks.map((task) =>
        task.id === action.taskId ? { ...task, isDone: action.isDone } : task
      );
      updateTasks(updatedTasks, action.todoListId);
      return copyState;
    }

    case "CHANGE-TASK-VALUE": {
      const tasks = getTasks(state, action.todoListId);
      const updatedTasks = tasks.map((task) =>
        task.id === action.taskId ? { ...task, title: action.taskValue } : task
      );
      updateTasks(updatedTasks, action.todoListId);
      return copyState;
    }

    case "ADD-TODOLIST": {
      copyState[action.tolistId] = [];
      return copyState;
    }

    case "REMOVE-TODOLIST": {
      delete copyState[action.id];
      return copyState;
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
