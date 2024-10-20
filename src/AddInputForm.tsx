import { IconButton, TextField } from "@mui/material";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React from "react";

type AddItemFormPropsType = {
  addNewItemToTodoList: (title: string) => void;
};

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  const [newItemValue, setNewItemValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onItemValueChangeHandel = (e: ChangeEvent<HTMLInputElement>) =>
    setNewItemValue(e.target.value);

  const onKeyDawnHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    // при нажатии любой  клавиши  в инпуте ошибка очищается и исчезает
    if(setErrorMessage !== null) {
      setErrorMessage(null);
    }

    //проверяем нажат ли энтер
    if (e.key === "Enter") {
      onAddClickHandel();
    }
  };

  const onAddClickHandel = () => {
    if (newItemValue.trim() !== "") {
      props.addNewItemToTodoList(newItemValue);
      setNewItemValue("");
    } else {
      setErrorMessage("Title is required");
    }
  };

  return (
    <div>
      <TextField
        value={newItemValue}
        error={!!errorMessage}
        helperText={errorMessage}
        onChange={onItemValueChangeHandel}
        onKeyDown={onKeyDawnHandler}
        color={"secondary"}
        variant={"outlined"}
        label="enter a new value"  //TODO:сделать динамичным!
      />
      <IconButton onClick={onAddClickHandel} color={"primary"}>
        <AddCircleIcon />
      </IconButton>
    </div>
  );
})

export default AddItemForm;
