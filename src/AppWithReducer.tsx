import { useReducer, useRef, useState } from "react";
import "./App.css";
import TodoList, { TasksType } from "./TodoList";
import { v1 } from "uuid";
import AddItemForm from "./AddInputForm";
import {
  AppBar,
  Button,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { todoReducer } from "./state/todo-reducer";
import { addTaskAC, removeTaskAC, tasksReducer } from "./state/task-reducer";

// чтобы не перепутать названия
export type FilterValuesType = "all" | "completed" | "active";
// тип данных тутду
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type tasksObjType = {
  [key: string]: Array<TasksType>;
};

function AppWithReducer() {
  let todoListId1 = v1();
  let todoListId2 = v1();

  // передаем нужный  reduser  и начальный стейт
  //  стейт и функцию к-ая будет фиксировать изменения - диспач(закинет стейт   потом сделает преобразование стейта)
  let [todoLists, dispatchTodoReducer] = useReducer(todoReducer, [
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to but", filter: "all" },
  ]);
  let [tasksObj, dispatchTasksReducer] = useReducer(tasksReducer, {
    [todoListId1]: [
      { id: v1(), title: "Learn JS", isDone: false },
      { id: v1(), title: "Learn React", isDone: true },
      { id: v1(), title: "Learn ", isDone: true },
    ],
    [todoListId2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Cheir", isDone: true },
    ],
  });

  function removeTodoList(todoListId: string) {
    const action = removeTodoList(todoListId);
    dispatchTodoReducer(action)
  }
  function removeTask(id: string, todoListId: string) {
    // получим экшен из функции криертора
    const action = removeTaskAC(id, todoListId);
    // задиспачим полученный экшен
    dispatchTasksReducer(action)
  }
  function addTask(title: string, todoListId: string) {
   const action = addTaskAC(title, todoListId);
   dispatchTasksReducer(action)
  }
  function addTodoList(title: string) {
    // новый объект с измененным значение тайтл
    let todoList: TodoListType = { id: v1(), title: title, filter: "all" };
    setTodoList([todoList, ...todoLists]);
    setTasksObj({ ...tasksObj, [todoList.id]: [{ todoList }] });
  }
  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasksObj({ ...tasksObj });
    }
  }
  function changeFilter(value: FilterValuesType, todoListId: string) {
    // ищем - есть ли туду лист с нужным ид
    let todoList = todoLists.find((tl) => tl.id === todoListId);
    // если todoList есть то меням значение его фильтра на ту строку, что передали
    if (todoList) {
      todoList.filter = value;
      setTodoList([...todoLists]);
    }
  }
  function changeTaskTitle(title: string, taskId: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = title;
      setTasksObj({ ...tasksObj });
    }
  }
  function changeTodoTitle(title: string, todoListId: string) {
    debugger;
    let todoList = todoLists.find((tl) => tl.id === todoListId);
    if (todoList) {
      todoList.title = title;
      setTodoList([...todoLists]);
    }
  }

  return (
    <div className="app">
      <AppBar>
        <Toolbar>
          <IconButton edge="start" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography>News</Typography>
          <Button color="inherit">login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid container sx={{ mt: 10, mb: 5 }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>

        <Grid container spacing="10">
          {todoLists.map((tl) => {
            let tasksForTodo = tasksObj[tl.id];

            if (tl.filter === "active") {
              tasksForTodo = tasksForTodo.filter((task) => !task.isDone);
            }
            if (tl.filter === "completed") {
              tasksForTodo = tasksForTodo.filter((task) => task.isDone);
            }

            return (
              <Grid item>
                <Paper sx={{ p: "7px" }}>
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodo}
                    removeTodoList={removeTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoTitle={changeTodoTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducer;
