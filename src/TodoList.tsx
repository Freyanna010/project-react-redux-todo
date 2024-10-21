import { ChangeEvent, useEffect } from "react";
import { FilterValuesType } from "./AppWithRedux";
import AddItemForm from "./AddInputForm";
import EditableSpan from "./EditableSpan";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Checkbox } from "@mui/material";
import { pink, grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/store";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskValueAC,
  removeTaskAC,
} from "./state/task-reducer";

// типизация для каждого объeкта тасок
export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};
type PropsType = {
  id: string;
  title: string;
  removeTodoList: (todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  filter: FilterValuesType;
  changeTodoTitle: (title: string, todoListId: string) => void;
};

function TodoList(props: PropsType) {
  useEffect(() => {
    console.log("Updated title in props:", props.title);
  }, [props.title]);

  const dispatch = useDispatch(); //получить диспач для отправки экшенов
  const tasks = useSelector((state: RootState) => state.tasks[props.id]); // получить таски из редакса только из нужного туду

  const onAllClickHandler = () => props.changeFilter("all", props.id); //при нажатии на all вызвать changeFilter к-ая в app вызовет нужный экшен там менятся значение фильтра
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  }; //удалить весь туду лист
  const onChangeTodoTitleHandler = (title: string) => {
    props.changeTodoTitle(title, props.id);
  }; //менять значение

  // в зависмости от значения фильтра меняем или нет содержание тасок
  let tasksForTodo = tasks;
  if (props.filter === "active") {
    tasksForTodo = tasksForTodo.filter((task) => !task.isDone);
  }
  if (props.filter === "completed") {
    tasksForTodo = tasksForTodo.filter((task) => task.isDone);
  }

  return (
    <div>
      <div>
        <EditableSpan title={props.title} onChange={onChangeTodoTitleHandler} />
        <IconButton
          aria-label="delete"
          onClick={removeTodoList}
          color={"primary"}
        >
          <DeleteIcon />
        </IconButton>
      </div>
      {/* добавление задачи */}
      <AddItemForm
        addNewItemToTodoList={(title) => dispatch(addTaskAC(title, props.id))}
      />
      <ul>
        {tasksForTodo.map((task) => {
          const onRemoveTaskHandel = () =>
            dispatch(removeTaskAC(task.id, props.id));
          const onChangeStatusHandel = (e: ChangeEvent<HTMLInputElement>) => {
            let newDoneValue = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(task.id, props.id, newDoneValue));
          };
          const onChangeTitleValueHandel = (title: string) => {
            dispatch(changeTaskValueAC(task.id, props.id, title));
          };

          return (
            <li key={task.id}>
              <div className={task.isDone ? "is-done" : ""}>
                <Checkbox
                  id="checkbox"
                  checked={task.isDone}
                  onChange={onChangeStatusHandel}
                  // sx={{
                  //   color: pink[800],
                  //   "&.Mui-checked": {
                  //   color: pink[300],
                  //   },
                  // }}
                />
                <EditableSpan
                  title={task.title}
                  onChange={onChangeTitleValueHandel}
                />
                <IconButton
                  aria-label="delete"
                  onClick={onRemoveTaskHandel}
                  color={"primary"}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </li>
          );
        })}
      </ul>

      <Button
        onClick={onAllClickHandler}
        variant={props.filter === "all" ? "contained" : "text"}
      >
        all
      </Button>
      <Button
        variant={props.filter === "active" ? "contained" : "text"}
        onClick={onActiveClickHandler}
      >
        active
      </Button>
      <Button
        onClick={onCompletedClickHandler}
        variant={props.filter === "completed" ? "contained" : "text"}
      >
        completed
      </Button>
    </div>
  );
}

export default TodoList;
