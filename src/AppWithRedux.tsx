import "./App.css";
import TodoList, { TasksType } from "./TodoList";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
} from "./state/todo-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/store";

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

function AppWithRedux() {
  const dispatch = useDispatch();
  const todoLists = useSelector((state: RootState) => state.todoList);
  const tasks = useSelector((state: RootState) => state.tasks);

  function removeTodoList(todoListId: string) {
    const action = removeTodoListAC(todoListId);
    dispatch(action); //сразу в два редьюсера
  }
  function removeTask(id: string, todoListId: string) {
    // получим экшен из функции криертора
    const action = removeTaskAC(id, todoListId);
    // задиспачим полученный экшен
    dispatch(action);
  }
  function addTask(title: string, todoListId: string) {
    const action = addTaskAC(title, todoListId);
    dispatch(action);
  }
  function addTodoList(title: string) {
    const action = addTodoListAC(title);
    dispatch(action);
  }
  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    const action = changeTaskStatusAC(taskId, todoListId, isDone);
    dispatch(action);
  }
  function changeFilter(value: FilterValuesType, todoListId: string) {
    const action = changeTodoListFilterAC(value, todoListId);
    dispatch(action);
  }

  function changeTaskTitle(title: string, taskId: string, todoListId: string) {
    const action = changeTaskTitleAC(title, taskId, todoListId);
    dispatch(action);
  }
  function changeTodoTitle(title: string, todoListId: string) {
    const action = changeTodoListTitleAC(title, todoListId);
    dispatch(action);
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
            let tasksForTodo = tasks[tl.id];

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

export default AppWithRedux;
