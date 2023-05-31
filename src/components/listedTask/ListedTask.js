import React, { useEffect, useState } from "react";
import TaskDeleteConfirmation from "../taskDeleteConfirmation/TaskDeleteConfirmation";
import "./listedTask.css";

const ListedTask = ({ task, onTaskCheck, onTaskClick, onTaskDelete }) => {
  const [mockedCheck, setMockedCheck] = useState(task.done);
  const [toDeleteConfirmation, setToDeleteConfirmation] = useState(false);

  useEffect(() => {
    setMockedCheck(task.done);
  }, [task]);

  const onCheck = () => {
    onTaskCheck(task.id, !mockedCheck); // Notify TaskList parent
  };

  const onShowDetails = () => {
    console.log("user wants to edit task id ", task.id);
    onTaskClick(task); // Notify TaskList parent
  };

  const onDelete = () => {
    console.log("user wants to delete task id ", task.id);
    setToDeleteConfirmation(true);
  };

  const toDelete = (boolean) => {
    if (boolean) {
      onTaskDelete(task.id); // Notify TaskList parent
    }
    setToDeleteConfirmation(false);
  };

  return (
    <li>
      <input
        className="grid-item"
        type="checkbox"
        id={task.id}
        checked={mockedCheck}
        onChange={() => onCheck()}
      />
      <div
        onClick={() => onShowDetails()}
        className={mockedCheck ? "completed grid-item" : "grid-item"}
      >
        <span className="pointer">{task.title}</span>
      </div>
      <span
        className={`${
          ["white", "yellow", "orange", "red"][task.priority]
        } green-${task.done}`}
      >
        <i className="priority-icon bx bxs-circle"></i>{" "}
      </span>
      <i
        className="bx bx-pencil grid-item pointer"
        onClick={() => onShowDetails()}
      ></i>
      {!toDeleteConfirmation && (
        <i
          className="bx bx-trash-alt grid-item pointer"
          onClick={() => onDelete()}
        ></i>
      )}
      {toDeleteConfirmation && (
        <TaskDeleteConfirmation confirmationResp={toDelete} />
      )}
    </li>
  );
};

export default ListedTask;
