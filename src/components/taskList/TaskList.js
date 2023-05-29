import React, { useEffect, useState } from "react";
import data from "../../data/todosData.json";
import ListedTask from "../listedTask/ListedTask";
import "./taskList.css";

const TaskList = () => {
  const [todos, setTodos] = useState(data);
  const [checkedBox, setCheckedBox] = useState(false);
  console.log("init todos = ", todos);

  const sortTodos = (array) => {
    const sortedTodos = [...array];
    sortedTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by create attribute
    sortedTodos.sort((a, b) => a.done - b.done); // Sort by Done attribute
    return sortedTodos;
  };
  useEffect(() => {
    setTodos(sortTodos(todos));
  }, []);

  useEffect(() => {
    if (todos.every((task) => task.done)) {
      setCheckedBox(true);
    } else {
      setCheckedBox(false);
    }
  }, [todos]);

  const onCheckAll = () => {
    const updatedTodos = todos.map((task) => {
      if (todos.every((task) => task.done)) {
        setCheckedBox(false);
        return {
          ...task,
          done: false,
        };
      } else if (task.done === false) {
        return {
          ...task,
          done: true,
        };
      }
      return task;
    });
    console.log("new todos = ", updatedTodos);
    setTodos(updatedTodos);
  };

  //Update todos when a todo is updated from children component
  const handleTaskCheck = (taskId, isChecked) => {
    console.log("handlecheck called with", taskId, isChecked);
    const updatedTodos = todos.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          done: isChecked,
        };
      }
      return task;
    });

    const sortedTodos = sortTodos(updatedTodos);
    setTodos(sortedTodos);
  };

  return (
    <>
      <ul className="todo-list">
        <li className="attribute-li">
          <input
            className="grid-item"
            type="checkbox"
            checked={checkedBox}
            onChange={() => onCheckAll()}
          />
          <span className="grid-item">Task</span>
          <span className="grid-item priority-item">Priority</span>
        </li>
        {todos.map((todo) => (
          <ListedTask task={todo} key={todo.id} onTaskCheck={handleTaskCheck} />
        ))}
      </ul>
    </>
  );
};

export default TaskList;
