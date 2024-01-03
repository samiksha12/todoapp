const KEY = "data";

export const addData = (data_id, item) => {
  const data = getList();
  const newItem = { name: item, done: false };
  if (data.hasOwnProperty(data_id)) {
    data[data_id].push(newItem);
  } else {
    data[data_id] = [newItem];
  }
  localStorage.setItem(KEY, JSON.stringify(data));
  return data;
};

export const getList = () => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : {};
};
export const updateData = (data_id, item, index) => {
  const data = getList();
  const newItem = { name: item, done: false };
  if (data.hasOwnProperty(data_id)) {
    data[data_id][index] = newItem;
  }
  localStorage.setItem(KEY, JSON.stringify(data));
  return data;
};

export const deleteData = (data_id, index) => {
  const data = getList();
  if (data.hasOwnProperty(data_id)) {
    data[data_id].splice(index, 1);
  }
  localStorage.setItem(KEY, JSON.stringify(data));
  return data;
};
export const doneUpdate = (data_id, index) => {
  const data = getList();
  if (data.hasOwnProperty(data_id) && data[data_id][index]) {
    data[data_id][index].done = !data[data_id][index].done;
  }
  localStorage.setItem(KEY, JSON.stringify(data));
  return data;
};
export const draggedUpdate = (data_id, list) => {
  const data = getList();
  if (data.hasOwnProperty(data_id)) {
    data[data_id] = list;
  }
  localStorage.setItem(KEY, JSON.stringify(data));
  return data;
};
export const deleteDataList = (data_id) => {
  const data = getList();
  if (data.hasOwnProperty(data_id)) {
    delete data[data_id];
    localStorage.setItem(KEY, JSON.stringify(data));
  }
  return data;
};
