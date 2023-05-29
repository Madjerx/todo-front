import React from "react";
import todos from "../../data/todosData.json";
import ListedTask from "../listedTask/ListedTask";
import "./taskList.css";

const TaskList = () => {
  return (
    <>
      <ul className="todo-list">
        <li className="attribute-li">
          <input
            className="grid-item"
            type="checkbox"
          />
          <span className="grid-item">Task</span>
          <span className="grid-item priority-item">Priority</span>
        </li>
        {todos.map((todo) => (
          <ListedTask task={todo} key={todo.id} />
        ))}
      </ul>
    </>
  );
};

export default TaskList;
