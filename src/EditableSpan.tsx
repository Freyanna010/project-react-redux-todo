import { TextField } from "@mui/material";
import { useState, ChangeEvent } from "react";

type EditableSpanType = {
  title: string;
  onChange: (title: string) => void;
};

function EditableSpan(props: EditableSpanType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState("");

  let activeEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  let activeViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  return editMode ? (
    <TextField
      value={title}
      onBlur={activeViewMode}
      onChange={onChangeHandler}
    />
  ) : (
    <span onDoubleClick={activeEditMode}>{props.title}</span>
  );
}

export default EditableSpan;
