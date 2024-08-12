import { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import AddItemForm from "./AddInputForm";
import EditableSpan from "./EditableSpan";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Checkbox } from "@mui/material";
import { pink, grey } from "@mui/material/colors";

// типизация для каждого объeкта тасок
export type TasksType = {
  "id": string;
  title: string;
  isDone: boolean;
};

//  типизация для пропсов, которые принимает тудулист
type PropsType = {
  id: string;
  title: string;
  //  принимает массив, который состоит из объектов соответственных TasksType
  tasks: Array<TasksType>;
  removeTodoList: (todoListId: string) => void;
  removeTask: (taskId: string, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  //  значения должны соответствовать названим из FilterValuesType
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => void;
  filter: FilterValuesType;
  changeTaskTitle: (title: string, taskId: string, todoListId: string) => void;
  changeTodoTitle: (title: string, todoListId: string) => void;
};

function TodoList(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);
  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };
  const onChangeTodoTitleHandler = (title: string) => {
    debugger;
    props.changeTodoTitle(title, props.id);
  };

  //  оболочка для аддтаск которой для выполнения нужен id

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div       >
      <h2>
        <EditableSpan title={props.title} onChange={onChangeTodoTitleHandler} />

        <IconButton
          aria-label="delete"
          onClick={removeTodoList}
          color={"primary"}
        >
          <DeleteIcon />
        </IconButton>
      </h2>

      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((task) => {
          const removeTask = () => props.removeTask(task.id, props.id);
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id);
          };
          const onChangeTitleHandler = (title: string) => {
            props.changeTaskTitle(title, task.id, props.id);
          };
          return (
            <li key={task.id}>
              <div className={task.isDone ? "is-done" : ""}>
                <Checkbox
                  id="checkbox"
                  checked={task.isDone}
                  onChange={onChangeStatusHandler}
                  // sx={{
                  //   color: pink[800],
                  //   "&.Mui-checked": {
                  //   color: pink[300],
                  //   },
                  // }}
                />
                <EditableSpan
                  title={task.title}
                  onChange={onChangeTitleHandler}
                />
                <IconButton
                  aria-label="delete"
                  onClick={removeTask}
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
