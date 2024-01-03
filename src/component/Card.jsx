import React, { memo, useContext } from "react";
import { TodoListContext } from "../context/ToDoListContext";

const Card= ((props)=> {
    const {deleteList,highLightList} = useContext(TodoListContext);
  const list = props.list;
  const keyId = props.keyId;
  const counter = props.index;
  return (
    <div
      className="card col-md-3 m-2 p-2"
      style={{ width: "18rem", height: "18rem" }}
      onClick={()=>{highLightList(keyId)}}
    >
      <div className="card-header">
        <div className="d-flex justify-content-between">
          <span>List {counter + 1}</span>
          <span>
            <i className="fa-solid fa-xmark" onClick={()=>{deleteList(keyId)}}></i>
          </span>
        </div>
      </div>
      <ol className="overflow-scroll">
        {list?.map((item, index) => (
          <li key={index} className=" m-2">
            {!item.done ? item.name : <s>{item.name}</s>}
          </li>
        ))}
      </ol>
    </div>
  );
})

export default memo(Card);
