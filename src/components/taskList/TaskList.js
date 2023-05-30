import React, { useEffect, useState } from "react";
import data from "../../data/todosData.json";
import ListedTask from "../listedTask/ListedTask";
import "./taskList.css";
import { getAllTasks, patchOneTask } from "../../services/apiServices";

const TaskList = () => {
  const [todos, setTodos] = useState([]);
  const [checkedBox, setCheckedBox] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const sortTodos = (array) => {
    const undoneTodos = array.filter((item) => !item.done);
    const doneTodos = array.filter((item) => item.done);

    undoneTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    doneTodos.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));

    console.log([...undoneTodos, ...doneTodos]);
    return [...undoneTodos, ...doneTodos];
  };

  const fetchAllTasks = () => {
    getAllTasks()
      .then((resp) => {
        const sortedTodos = sortTodos(resp);
        setTodos(sortedTodos);
      })
      .catch((error) => {
        // Handle error when bad request or no server response
        console.error("Error getting all tasks:", error);
      });
  };

  useEffect(() => {
    // call backend getAll Route at first render
    fetchAllTasks();
  }, []);

  useEffect(() => {
    if (todos.every((task) => task.done)) {
      setCheckedBox(true);
    } else {
      setCheckedBox(false);
    }
  }, [todos]);

  //Update all task done attribute when click checkbox
  const onCheckAll = () => {
    const opositeCheckbox = !checkedBox;

    setCheckedBox(opositeCheckbox);

    if (opositeCheckbox) {
      todos.forEach((task) => {
        if (!task.done) {
          task.done = true;
          handleTaskCheck(task.id, task.done);
        }
      });
    } else {
      todos.forEach((task) => {
        if (task.done) {
          task.done = false;
          handleTaskCheck(task.id, task.done);
        }
      });
    }
    fetchAllTasks();
  };

  //Update todos when a todo is updated from children listedTask component
  const handleTaskCheck = async (taskId, isChecked) => {
    try {
      await patchOneTask(taskId, isChecked);
      try {
        fetchAllTasks();
      } catch (error) {
        console.log(
          `Failed to refresh list after working patch task id ${taskId}:`,
          error
        );
      }
    } catch (error) {
      console.error("Error patching task:", error);
    }
  };

  //Method called when click on Task Title
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
