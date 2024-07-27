import  {useState} from 'react'
import './App.css'
import TodoList, { TasksType } from "./TodoList";
import { v1 } from 'uuid';
import AddItemForm from './AddInputForm';
import { AppBar, Button, IconButton, ThemeProvider, Toolbar, Typography, Container, Grid, Paper } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";


// чтобы не перепутать названия
export type FilterValuesType = "all" | "completed" | "active";
// тип данных тутду
type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

type tasksObjType = {
  [key: string]: Array<TasksType>
}

function App() {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, setTodoList] = useState<Array<TodoListType>>([
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to but", filter: "all" },
  ]);
  let [tasksObj, setTasksObj] = useState<tasksObjType>({
    [todoListId1]: [
    
    ],
    [todoListId2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Cheir", isDone: true },
    ],
  });

  function removeTodoList(todoListId: string) {
    let filterTodoList = todoLists.filter((tl) => tl.id !== todoListId);
    setTodoList(filterTodoList);

    delete tasksObj[todoListId];
    setTasksObj({ ...tasksObj });
  }
  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let filterTask = tasks.filter((t) => t.id !== id);
    tasksObj[todoListId] = filterTask;
    setTasksObj({ ...tasksObj });
  }
  function addTask(title: string, todoListId: string) {
    debugger
    // получить массив тасок по айди
    let tasks = tasksObj[todoListId];
    // сформировать новую таску c полученным тайтлом
    let task = { id: v1(), title: title, isDone: false };
    // в массив новых тасок добавляем новую таску-объект и копируем старые
    let newTasks = [task, ...tasks];
    //  массив новых тасок обратно присвеваем в массив по айди - меням его
    tasksObj[todoListId] = newTasks;
    // изменный массив в стэйт
    setTasksObj({ ...tasksObj });
  }
  function addTodoList(title: string) {
    let todoList: TodoListType = { id: v1(), title: title, filter: "all" };
    setTodoList([todoList, ...todoLists]);
    setTasksObj({ ...tasksObj, [todoList.id]: [] });
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
        <Grid container sx={{ mt:10, mb:5}}>
          <AddItemForm addItem={addTodoList} />
        </Grid>

        <Grid  container spacing="10">
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
                <Paper sx={{p:"7px"}}>
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



export default App
