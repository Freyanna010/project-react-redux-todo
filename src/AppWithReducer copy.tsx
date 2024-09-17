import { useReducer } from "react";
import "./App.css";
import TodoList, { TasksType } from "./TodoList";
import { v1 } from "uuid";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todoReducer,
} from "./state/todo-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/task-reducer";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import AddItemForm from "./AddInputForm";

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
    const action = removeTodoListAC(todoListId);
    dispatchTodoReducer(action);
    dispatchTasksReducer(action);
  }
  function removeTask(id: string, todoListId: string) {
    // получим экшен из функции криертора
    const action = removeTaskAC(id, todoListId);
    // задиспачим полученный экшен
    dispatchTasksReducer(action);
  }
  function addTask(title: string, todoListId: string) {
    const action = addTaskAC(title, todoListId);
    dispatchTasksReducer(action);
  }
  function addTodoList(title: string) {
    const action = addTodoListAC(title);
    dispatchTodoReducer(action);
    dispatchTasksReducer(action);
  }
  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    const action = changeTaskStatusAC(taskId, todoListId, isDone);
    dispatchTasksReducer(action);
  }
  function changeFilter(value: FilterValuesType, todoListId: string) {
    const action = changeTodoListFilterAC(value, todoListId);
    dispatchTodoReducer(action);
  }

  function changeTaskTitle(title: string, taskId: string, todoListId: string) {
    const action = changeTaskTitleAC(title, taskId, todoListId);
    dispatchTasksReducer(action);
  }
  function changeTodoTitle(title: string, todoListId: string) {
    const action = changeTodoListTitleAC(title, todoListId);
    dispatchTodoReducer(action);
  }

  return (
    <div className="app">
      <AppBar>
        <Toolbar>
          <IconButton edge="start" aria-label="menu">
            {/* <MenuIcon /> */}
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
