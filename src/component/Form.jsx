import React, { useContext, useEffect, useState } from "react";
import { TodoListContext } from "../context/ToDoListContext";
import { useCanvas } from "../context/CanvasContext";

function Form() {
  const [todotext, setTodotext] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { addItem,addCanvasItem, editItem, edit, create, canvasActive, callCanvas,editCanvas } =
    useContext(TodoListContext);

    const {canvasRef,prepareCanvas} = useCanvas();
  const handleChange = (e) => {
    setTodotext(e.target.value);
    if (e.target.value.trim().length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      editItem.item = todotext;
      edit(editItem);
    } else {
      addItem(todotext);
    }
    setDisabled(true);
    setTodotext("");
  };
  const handleCreate = (e) => {
    e.preventDefault();
    create();
    setDisabled(true);
    setTodotext("");
  };

  const handleDraw = (e) => {
    e.preventDefault();
    callCanvas();
  };
  const handleSave = (e)=>{
    e.preventDefault();
    const canvas = canvasRef.current;
    const canvasData = canvas.toDataURL();
    addCanvasItem(canvasData);
    handleDraw(e);
    prepareCanvas();
  }

  useEffect(() => {
    if (editItem) {
      setTodotext(editItem.item);
      setDisabled(false);
    }
  }, [editItem]);
  return (
    <div className="container-md">
      <form className="col-md-12">
        {!canvasActive && (
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="todotext"
              aria-describedby="todotext"
              placeholder="Things to do:"
              value={todotext}
              onChange={handleChange}
              autoFocus={true}
            />
          </div>
        )}
        {!canvasActive ? (
          <button
            type="submit"
            className="btn btn-primary p-2 m-2"
            disabled={disabled}
            onClick={handleSubmit}
          >
            Submit
          </button>
        ) :(
          <button
            type="submit"
            className="btn btn-primary p-2 m-2"
            onClick={handleSave}
          >
            Save
          </button>
        )}
        <button
          type="submit"
          className="btn btn-primary p-2 m-2"
          onClick={handleCreate}
        >
          Create New List
        </button>
        <button
          type="submit"
          className="btn btn-primary p-2 m-2"
          onClick={handleDraw}
        >
          Draw List
        </button>
      </form>
    </div>
  );
}

export default Form;
