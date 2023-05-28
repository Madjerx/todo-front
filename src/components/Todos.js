import React from "react";
import todos from "../data/todosData.json";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

const Todos = () => {
  console.log("todos = ", todos);
  return (
    <div>
      <TaskInput />
      <TaskList />
    </div>
  );
};

export default Todos;
