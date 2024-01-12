import React, { useEffect, useState } from "react";
import {
  addData,
  createData,
  deleteData,
  deleteDataList,
  doneUpdate,
  draggedUpdate,
  getList,
  updateData,
} from "../data";
import { v4 as uuid } from "uuid";
export const TodoListContext = React.createContext({
  list: {},
  fullList: {},
  currentDataId: {},
  editItem: null,
  addItem: () => {},
  edit: () => {},
  editDataItem: () => {},
  deleteListItem: () => {},
  deleteList: () => {},
  create: () => {},
  done: () => {},
  draggedList: () => {},
  highLightList: () => {},
});

const TodoListContextProvider = ({ children }) => {
  const [list, setList] = useState(null);
  const [fullList, setFullList] = useState(null);
  const [dataId, setDataId] = useState(null);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const data_id = localStorage.getItem("data_id");
    const data = getList();
    if (data.hasOwnProperty(data_id)) {
      setList([...data[data_id]]);
      setDataId(data_id);
      setFullList(data);
    } else {
      setDataId(data_id);
      setFullList(data);
    }
  }, [dataId]);
  const addItem = (item) => {
    let updatedData;
    const data_id = localStorage.getItem("data_id");
    if (!data_id || data_id === null || data_id === undefined) {
      const list_id = activeDataId();
      updatedData = addData(list_id, item);
      settingList(updatedData);
    } else {
      updatedData = addData(data_id, item);
      settingList(updatedData);
    }
  };
  const edit = (item) => {
    let updatedData;
    updatedData = updateData(dataId, item.item, item.index);
    settingList(updatedData);
  };
  const deleteListItem = (index) => {
    let updatedData;
    updatedData = deleteData(dataId, index);
    settingList(updatedData);
  };
  const deleteList = (data_id) => {
    let updatedData = deleteDataList(data_id);
    settingList(updatedData);
  };

  const create = () => {
    activeDataId();
  };
  const done = (index) => {
    let updatedData;
    updatedData = doneUpdate(dataId, index);
    settingList(updatedData);
  };
  const draggedList = (list) => {
    let updatedData;
    updatedData = draggedUpdate(dataId, list);
    settingList(updatedData);
  };
  const editDataItem = (item, index) => {
    setEditItem({ item, index });
  };
  const highLightList = (data_id) => {
    localStorage.setItem("data_id", data_id);
    setDataId(data_id);
  };
  const activeDataId = () => {
    const active = uuid();
    const data_id = active.slice(0, 8);
    localStorage.setItem("data_id", data_id);
    setDataId(data_id);
    return data_id;
  };
  const settingList = (updatedData) => {
    setList(updatedData[dataId]);
    setFullList(updatedData);
  };

  return (
    <TodoListContext.Provider
      value={{
        list,
        fullList,
        currentDataId: dataId,
        addItem,
        edit,
        editDataItem,
        editItem,
        done,
        create,
        deleteList,
        deleteListItem,
        draggedList,
        highLightList,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};
export default TodoListContextProvider;
