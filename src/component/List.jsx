import React, { useContext } from "react";
import { getList } from "../data";
import Card from "./Card";
import { TodoListContext } from "../context/ToDoListContext";

function List() {
  const { fullList, currentDataId } = useContext(TodoListContext);
  return (
    <div className="container">
        <span className="list-header">Your Lists:</span>
    <div className="col-md-12 d-flex">
      {fullList &&
        Object.keys(fullList).map(
          (key, index) =>
            key !== currentDataId && (
              <Card
                key={index}
                keyId={key}
                list={fullList[key]}
                index={index}
              />
            )
        )}
    </div>
    </div>
  );
}

export default List;
