import React, { useEffect, useState } from "react";
import ListedTask from "../listedTask/ListedTask";
import TaskAddForm from "../taskInput/TaskAddForm";
import "./taskList.css";
import {
  deleteOneTask,
  getAllTasks,
  patchOneTask,
  postOneTask,
} from "../../services/apiServices";

import {
  mockedDeleteOneTask,
  mockedGetAllTasks,
  mockedPatchOneTask,
  mockedPostOneTask,
} from "../../services/mockedApi";

const TaskList = ({ taskToParent }) => {
  const [todos, setTodos] = useState([]);
  const [checkedBox, setCheckedBox] = useState(false);

  const sortTodos = (array) => {
    const undoneTodos = array.filter((item) => !item.done);
    const doneTodos = array.filter((item) => item.done);

    undoneTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    doneTodos.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));

    return [...undoneTodos, ...doneTodos];
  };

  const fetchAllTasks = () => {
    mockedGetAllTasks()
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
      await mockedPatchOneTask(taskId, isChecked);
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
  const handleTaskClick = (task) => {
    taskToParent(task);
  };

  //Method called to post new task after from submit from TaskAddForm children component
  const handleAddTask = async (taskTitle, priority, description) => {
    try {
      await mockedPostOneTask(taskTitle, priority, description);
      try {
        fetchAllTasks();
      } catch (error) {
        console.log(`Failed to refresh list after adding new task`, error);
      }
    } catch (error) {
      console.error("Error posting task:", error);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await mockedDeleteOneTask(taskId);
      try {
        fetchAllTasks();
      } catch (error) {
        console.log(`Failed to refresh list after delete task`, error);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
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
            onTaskDelete={handleTaskDelete}
          />
        ))}
      </ul>
      <p className="center">Another thing to do ?</p>
      <TaskAddForm addTask={handleAddTask} />
    </>
  );
};

export default TaskList;
