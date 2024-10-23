import "./App.css";
import TodoList, { TasksType } from "./TodoList";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
} from "./state/todo-reducer";
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

export type TasksList = {
  [key: string]: Array<TasksType>;
};

function AppWithRedux() {
  const dispatch = useDispatch(); //для того чтобы передавать action
  const todoLists = useSelector((state: RootState) => state.todoList); //достаем нужный массив

  function removeTodoList(todoListId: string) {
    const action = removeTodoListAC(todoListId);
    dispatch(action); //сразу в два редьюсера
  }

  function addTodoList(title: string) {
    const action = addTodoListAC(title);
    dispatch(action);
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    const action = changeTodoListFilterAC(value, todoListId);
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
          <AddItemForm addNewItemToTodoList={addTodoList} />
        </Grid>

        <Grid container spacing="10">
          {todoLists.map((tl) => {
            return (
              <Grid item>
                <Paper sx={{ p: "7px" }}>
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    removeTodoList={removeTodoList}
                    changeFilter={changeFilter}
                    filter={tl.filter}
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
