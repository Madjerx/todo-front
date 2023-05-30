import "./App.css";
import TaskList from "./components/taskList/TaskList";
import TaskAddForm from "./components/taskInput/TaskAddForm";

function App() {
  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="todo">
        <p className="center">What to do today ?</p>
        <TaskList />
        <p className="center">Another thing to do ?</p>
        <TaskAddForm />
      </div>
    </div>
  );
}

export default App;
