import React from "react";
import "./todo.css";
import TaskList from "../taskList/TaskList";
import TaskAddForm from "../taskInput/TaskAddForm";

const Todos = () => {
  return (
    <div className="todo">
      <p className="center">What to do today ?</p>
      <TaskList />
      <p className="center">Another thing to do ?</p>
      <TaskAddForm />
    </div>
  );
};

export default Todos;
