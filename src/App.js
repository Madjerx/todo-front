import "./App.css";
import TaskList from "./components/taskList/TaskList";
import TodoDetails from "./components/todoDetails/TodoDetails";
import { useState } from "react";

function App() {
  //const that handle display of Details window
  const [toDetails, setToDetails] = useState(null);

  //Method called when click on a Task from Tasklist children component
  //or from TodoDetails children component
  const taskToDisplayDetails = (task) => {
    if (toDetails != null) {
      setToDetails(null);
    } else {
      setToDetails(task);
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="todo">
        <p className="center">What to do today ?</p>
        <TaskList taskToParent={taskToDisplayDetails} />
      </div>
      {toDetails && (
        <TodoDetails onClose={taskToDisplayDetails} task={toDetails} />
      )}
    </div>
  );
}

export default App;
