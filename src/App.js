import { Fragment, useContext, useEffect } from "react";
import Form from "./component/Form";
import TodoList from "./component/TodoList";
import List from "./component/List";

function App() {
  
  return (
    <Fragment>
      <div className="App">
        <div className="container-md">
          <h1 className="text-center">To Do App</h1>
          <Form />
          <TodoList />
          <List/>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
