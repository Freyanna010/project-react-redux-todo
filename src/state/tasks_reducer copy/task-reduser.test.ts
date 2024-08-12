
import { expect,   test } from "vitest";
import { v1 } from "uuid";
import { tasksObjType } from "../../App";
import { removeTaskAC, tasksReducer} from "./task-reducer";
import { TasksType } from "../../TodoList";


  // изначальный вид массива
test('correct task should be deleted from correct array', () => {
    const startState: tasksObjType= {
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

    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    // каждая id  не равна двум
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
})