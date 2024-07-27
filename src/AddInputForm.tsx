import { Button, IconButton, TextField } from "@mui/material";
import { useState, ChangeEvent, KeyboardEvent} from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

function AddItemForm(props: AddItemFormPropsType) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const onKeyDawnHandler = (e: 
     KeyboardEvent<HTMLInputElement>) => {
    // при нажатии любой  клавиши  в инпуте ошибка очищается и исчезает
    setError(null);
    //проверяем нажат ли энтер
    if (e.key === "Enter") {
      onAddClickHandler();
    }
  };   

  const onAddClickHandler = () => {
  if(title.trim() !== "") {
    props.addItem(title)
    setTitle("")
  } else{
    setError("Title is required");
  }    
  };

  return (
    <div>
      <TextField
        value={title}
        error={!!error}
        helperText={error}
        onChange={onTitleChangeHandler}
        onKeyDown={onKeyDawnHandler}
        color={"secondary"}
        variant={"outlined"}
        label="enter a value"
      />
      <IconButton
        onClick={onAddClickHandler}
               color={"primary"}
      >
        <AddCircleIcon/>
      </IconButton>
    </div>
  );
}


export default AddItemForm;
