import { TextField } from "@mui/material";
import { useState, ChangeEvent } from "react";

type EditableSpanType = {
  title: string;
  onChange: (title: string) => void;
};

function EditableSpan(props: EditableSpanType) {
  let [editMode, setEditMode] = useState(false); // определяет, находится ли компонент в режиме редактирования.
  let [titleValue, setTitleValue] = useState(props.title); // инициализируем с prop title

  // переключает компонент в режим редактирования
  const activateEditMode = () => {
    setEditMode(true);
  };

  // завершает редактирование и передает новое значение
  const activateViewMode = () => {
    setEditMode(false);
    if (titleValue.trim() !== "") {
      props.onChange(titleValue); // передаем новое значение, если оно не пустое
    } else {
      setTitleValue(props.title); // если значение пустое, сбрасываем на исходное
    }
  };

  // обновляем локальное состояние при изменении значения
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitleValue(e.target.value);

  return editMode ? (
    <TextField
      value={titleValue}
      onBlur={activateViewMode} // при потере фокуса сохраняем изменения
      onChange={onChangeHandler} // обновляем значение при вводе
      autoFocus // фокусируем на поле ввода
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span> // активируем редактирование по двойному клику
  );
}

export default EditableSpan;
