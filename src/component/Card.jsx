import React, { memo, useContext } from "react";
import { TodoListContext } from "../context/ToDoListContext";

const Card = (props) => {
  const { deleteList, highLightList } = useContext(TodoListContext);
  const list = props.list;
  const keyId = props.keyId;
  const counter = props.index;
  return (
    <div
      className="card col-md-3 col-2 m-2 p-2"
      style={{ width: "18rem", height: "18rem" }}
      onClick={() => {
        highLightList(keyId);
      }}
    >
      <div className="card-header">
        <div className="d-flex justify-content-between">
          <span>List {counter + 1}</span>
          <span>
            <i
              className="fa-solid fa-xmark"
              onClick={() => {
                deleteList(keyId);
              }}
            ></i>
          </span>
        </div>
      </div>
      <ol className="overflow-scroll">
        {list?.map((item, index) => (
          <div key={index}>
            {item.type === "canvas" ? (
              <img src={item.name} style={{width:'100%'}}/>
            ) : (
              <li className="m-2">
                {!item.done ? item.name : <s>{item.name}</s>}
              </li>
            )}
          </div>
        ))}
      </ol>
    </div>
  );
};

export default memo(Card);
