import React, { useContext, useEffect, useRef, useState } from "react";
import { TodoListContext } from "../context/ToDoListContext";

function TodoList() {
  const { list, editDataItem, deleteListItem, done,draggedList} =
    useContext(TodoListContext);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const handleSort = () => {
    let _list = [...list];
    const dragItemContent = _list.splice(dragItem.current, 1)[0];
    _list.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    draggedList(_list);
  };
  return (
    <div className="m-3 container-md list-scroll rounded border border-1" style={{ height: "10rem" }}>
      <ol className="sortable-list m-2">
        {list?.map((item, index) => (
          <li
            className="item"
            draggable="true"
            key={index}
            onDragStart={(e) => {
              dragItem.current = index;
            }}
            onDragEnter={(e) => {
              dragOverItem.current = index;
            }}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="d-flex justify-content-between p-2">
              <div>{!item.done ? item.name : <s>{item.name}</s>}</div>
              <div>
                <span
                  className="p-2"
                  onClick={() => {
                    done(index);
                  }}
                >
                  {!item.done ? (
                    <i className="fa-regular fa-square"></i>
                  ) : (
                    <i className="fa-regular fa-square-check"></i>
                  )}
                </span>
                <span className="p-2">
                  <i
                    className="fa-solid fa-pen"
                    onClick={() => {
                      editDataItem(item.name, index);
                    }}
                  ></i>
                </span>
                <span className="p-2">
                  <i
                    className="fa-solid fa-xmark"
                    onClick={() => {
                      deleteListItem(index);
                    }}
                  ></i>
                </span>
                <span className="p-2">
                  <i className="fa-solid fa-up-down-left-right"></i>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TodoList;
