import { expect, test } from "vitest";
import { v1 } from "uuid";
import { tasksObjType } from "../App";
import {
  addTaskAC,
  removeTaskAC,
  changeTaskStatusAC,
  tasksReducer,
  changeTaskTitleAC,
} from "./task-reducer";
import { TasksType } from "../TodoList";
import { addTodoListAC } from "./todo-reducer";


test("correct task should be deleted from correct array", () => {
  const startState: tasksObjType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = removeTaskAC("2", "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  // каждая id  не равна двум
  expect(endState["todolistId2"].every((t) => t.id !== "2")).toBeTruthy();
});
test("correct task should be added to correct array", () => {
  const startState: tasksObjType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = addTaskAC("juce", "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].isDone).toBe(false);
});
test("status of specified task should be changed", () => {
  const startState: tasksObjType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = changeTaskStatusAC("2", "todolistId2", false);
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId2"][1].isDone).toBe(false);
  expect(endState["todolistId1"][1].isDone).toBe(true);
});
test("title of specified task should be changed", () => {
  const startState: tasksObjType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = changeTaskTitleAC("2", "todolistId2", "Bread");
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId2"][1].title).toBe("Bread");
  expect(endState["todolistId1"][1].title).toBe("JS");
});
test("new property with new array should be added when new todolist is added", () => {
  const startState: tasksObjType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = addTodoListAC("title no matter");
  const endState = tasksReducer(startState, action);

  //возвращает массив в виде строк этих вещей 
  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }
  expect(keys.length).toBe(3)
  // так как массивы не равны  
  expect(endState[newKey]).toEqual([])
});
