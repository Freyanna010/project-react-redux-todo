import { expect, test } from "vitest"
import { tasksObjType, TodoListType } from "../App"
import { addTodoListAC, todoReducer } from "./todo-reducer";
import { tasksReducer } from "./task-reducer";

test('ids should be equals', () => {
    const startTasksState: tasksObjType = {}
    const startTodoListsState: Array<TodoListType> = []

    // отправить action и два редьюсера
    const action = addTodoListAC ('new todolist')
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todoReducer(startTodoListsState, action);

    const keys = Object.keys(endTasksState)
    // получается один ключ= ади из экшена
    const idFromTasks = keys[0]
    // тоже должен быть равен айди из экшена
    const idFromTodoLists = endTodolistState[0].id

    expect(idFromTasks).toBe(action.tolistId)
    expect(idFromTodoLists).toBe(action.tolistId)
})
