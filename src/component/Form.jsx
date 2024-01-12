import React, { useContext, useEffect, useState } from "react";
import { TodoListContext } from "../context/ToDoListContext";

function Form() {
  const [todotext, setTodotext] = useState("");
  const [disabled, setDisabled] = useState(true);
  const {addItem,editItem,edit,create} = useContext(TodoListContext);

  const handleChange = (e)=>{
    setTodotext(e.target.value);
    if(e.target.value.trim().length > 0 ){
      setDisabled(false);
    }else{
      setDisabled(true);
    }
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(editItem){
      editItem.item=todotext;
      edit(editItem);
    }else{
      addItem(todotext);
    }
    setDisabled(true);
    setTodotext("");
  }
  const handleCreate = (e)=>{
    e.preventDefault();
    create();
    setDisabled(true);
    setTodotext("");
  }
  useEffect(()=>{
    if(editItem){
      setTodotext(editItem.item);
      setDisabled(false);
    }
  },[editItem])
  return (
    <div className="container-md">
      <form className="col-md-12">
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
        <button type="submit" className="btn btn-primary p-2 m-2" disabled={disabled} onClick={handleSubmit}>
          Submit
        </button>
        <button type="submit" className="btn btn-primary p-2 m-2" onClick={handleCreate}>
          Create New List
        </button>
      </form>
    </div>
  );
}

export default Form;
