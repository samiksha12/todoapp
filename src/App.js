import { Fragment, useContext, useEffect } from "react";
import Form from "./component/Form";
import TodoList from "./component/TodoList";
import List from "./component/List";
import { TodoListContext } from "./context/ToDoListContext";
import CanvasDraw from "./component/CanvasDraw";

function App() {
  const { canvasActive } = useContext(TodoListContext);
  
  return (
    <Fragment>
      <div className="App">
        <div className="container-md">
          <h1 className="text-center">To Do App</h1>
          <Form />
          {!canvasActive ? <TodoList /> : <CanvasDraw />}
          <List />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
