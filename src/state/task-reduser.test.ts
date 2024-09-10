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
  // создаем изначальный стейт
  const startState: tasksObjType = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    "todolistId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  // получаем объект экшен из функции-фабрики
  //  для этого ей нужены айди таски и тудулиста
  const action = removeTaskAC("2", "todolistId2");

  // передаем в редьюсер начальный стейт и  акшен из которого получим нужные данные
  //  редьюсер с помощью этих данных изменит начальный стейт
  const endState = tasksReducer(startState, action);
  
  // проверим првильно ли редьюсер изменил наши данне
  // первый массив тассок измениться не должен
  expect(endState["todolistId1"].length).toBe(3);
  // втрой массив должен уменьшиться
  expect(endState["todolistId2"].length).toBe(2);
  // проверям нет ли среди тасок таски-обьекта с айди 2
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
  // проверяем, что айди был определн (он генерируется в редьюсере)
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

  // во втором массиве изменилось на фолс (специально указали одинаковый айди внутри обьекта-такски из двух разных масивов)
  expect(endState["todolistId2"][1].isDone).toBe(false);
  // а в первом -нет
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

  // экшен из туду-редьюсера
  const action = addTodoListAC("title no matter");
  // но отправляеи его и в таскс-редьюсер
  const endState = tasksReducer(startState, action);

  //возвращает массив в виде строк этих ключей todolistId1 и тд
  
  const keys = Object.keys(endState);
  // находим ключ который не первый и на второй ключ
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2");
  // если такого ключа нет
  if (!newKey) {
    throw Error("new key should be added");
  }
  // длина  массива с клюсами должна быть = 3 
  expect(keys.length).toBe(3);
  // ту би нельзя! так как массивы не равны
  expect(endState[newKey]).toEqual([]);
});
