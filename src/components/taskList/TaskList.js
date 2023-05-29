import React, { useEffect, useState } from "react";
import data from "../../data/todosData.json";
import ListedTask from "../listedTask/ListedTask";
import "./taskList.css";

const TaskList = () => {
  const [todos, setTodos] = useState([]);
  const [checkedBox, setCheckedBox] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const sortTodos = (array) => {
    const undoneTodos = array.filter((item) => !item.done);
    const doneTodos = array.filter((item) => item.done);

    undoneTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    doneTodos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    console.log([...undoneTodos, ...doneTodos]);
    return [...undoneTodos, ...doneTodos];
  };

  useEffect(() => {
    // call backend getAll Route
    const getTodos = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/tasks/getTasks"
        );
        const jsonTodo = await response.json();
        const sortedTodos = sortTodos(jsonTodo);
        setTodos(sortedTodos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getTodos();
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
  const handleTaskCheck = async (taskId, isChecked) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/tasks/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ done: isChecked }), // JSON body data
        }
      );

      console.log("resp = ", response);

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
    } catch (error) {
      // Handle error
      console.error("Error patching data:", error);
    }
  };

  const handleTaskClick = (id) => {
    console.log("display detail for task id", id);
    setTaskToEdit(id);
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
          <ListedTask
            task={todo}
            key={todo.id}
            onTaskCheck={handleTaskCheck}
            onTaskClick={handleTaskClick}
          />
        ))}
      </ul>
    </>
  );
};

export default TaskList;
