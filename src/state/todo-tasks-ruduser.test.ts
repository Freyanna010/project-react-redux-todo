import { expect, test } from "vitest"
import { tasksObjType, TodoListType } from "../App"
import { addTodoListAC, todoReducer, removeTodoListAC } from "./todo-reducer";
import { tasksReducer } from "./task-reducer";

test('ids should be equals', () => {
    // стартовый стейт для тасок
    const startTasksState: tasksObjType = {}
    // и пустой массив туду листов
    const startTodoListsState: Array<TodoListType> = []

    // отправить action по созданию туду и два редьюсера
    const action = addTodoListAC ('new todolist')
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todoReducer(startTodoListsState, action);
     
    // провреям  айди
    // если пробежимсф по таскам
    const keys = Object.keys(endTasksState)
    // получается один ключ = айди из экшена
    const idFromTasks = keys[0]
    // берем айди из  финального туду
    const idFromTodoLists = endTodolistState[0].id
     
    // полученные айди должен быть в экшене
    expect(idFromTasks).toBe(action.tolistId)
    expect(idFromTodoLists).toBe(action.tolistId)
})

 test("property with todolistId should be deleted", () => {
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

   const action = removeTodoListAC("todolistId2");
   const endState = tasksReducer(startState, action);

   const keys = Object.keys(endState);
// должен остаться только один ключ
   expect(keys.length).toBe(1);
// должно быть невозможно прочитать свойство удаленного туду
   expect(endState["todolistId2"]).toBeUndefined();
 });