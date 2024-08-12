import { tasksObjType } from "../../App";
import { TasksType } from "../../TodoList";
import { RemoveTodoListAction } from "./task-reducer";
import { v1 } from "uuid";

export type RemoveTask = {
  type: "REMOVE-TASK";
  taskId: string;
  todolistId: string;
};
export type Action2 = {
  type: "2";
  title: string;
};

type Actions = RemoveTask | Action2;
export const tasksReducer = (
  state: tasksObjType,
  action: Actions
): tasksObjType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = {...}
     
    }
    case "2": {
      return {
        ...state,
      };
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
export const action1tAC = (title: string): Action2 => {
  return { type: "2", title };
};
