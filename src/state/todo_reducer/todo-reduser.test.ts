import {
  addTodoListAC,
  changeTodoListFilterAC,
  ChangeTodoListFilterAction,
  changeTodoListTitleAC,
  ChangeTodoListTitleAction,
  removeTodoListAC,
  todoReducer,
} from "./todo-reducer";
import { expect, test } from "vitest";
import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";

test("correct todolist should be removed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  // изначальный вид массива
  const startState: Array<TodoListType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];
// в тудуредьюсер передаем нужный акшен - удалить туду лист с нужным айди из начального стейта
  const endState = todoReducer(startState, removeTodoListAC(todolistId1));
// провереям, что будет после удаления
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be add", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodoListTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState = todoReducer(startState, addTodoListAC(newTodoListTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodoListTitle);
  expect(endState[2].filter).toBe("all");
});

test("correct todolist should change its name", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodoListTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const action = changeTodoListTitleAC(todolistId2, newTodoListTitle);

  const endState = todoReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodoListTitle);
});

test("correct filter of todolist should be changed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newFilter: FilterValuesType = "completed";

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const action = changeTodoListFilterAC(todolistId2, newFilter);

  const endState = todoReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
