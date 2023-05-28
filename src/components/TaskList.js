import React from "react";
import todos from "../data/todosData.json";
import ListedTask from "./ListedTask";

const TaskList = () => {
  return (
    <>
      <ul>
        {todos.map((todo, index) => (
          <ListedTask task={todo} key={todo.id} />
        ))}
      </ul>
    </>
  );
};

export default TaskList;
