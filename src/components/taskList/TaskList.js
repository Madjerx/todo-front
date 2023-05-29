import React, { useEffect, useState } from "react";
import data from "../../data/todosData.json";
import ListedTask from "../listedTask/ListedTask";
import "./taskList.css";

const TaskList = () => {
  const [todos, setTodos] = useState(data);
  const [checkedBox, setCheckedBox] = useState(false);

  const sortTodos = (array) => {
    const undoneTodos = array.filter((item) => !item.done);
    const doneTodos = array.filter((item) => item.done);

    undoneTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    doneTodos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return [...undoneTodos, ...doneTodos];
  };

  useEffect(() => {
    const sortedTodos = sortTodos(todos);
    setTodos(sortedTodos);
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
    const sortedTodos = sortTodos(updatedTodos);
    setTodos(sortedTodos);
  };

  //Update todos when a todo is updated from children component
  const handleTaskCheck = (taskId, isChecked) => {
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
