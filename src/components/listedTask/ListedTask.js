import React, { useEffect, useState } from "react";
import "./listedTask.css";

const ListedTask = ({ task, onTaskCheck, onTaskClick }) => {
  const [mockedCheck, setMockedCheck] = useState(task.done);

  useEffect(() => {
    setMockedCheck(task.done);
  }, [task]);

  const onCheck = () => {
    const updatedCheck = !mockedCheck;
    setMockedCheck(updatedCheck);
    onTaskCheck(task.id, updatedCheck); // Notify TaskList parent
  };

  const onShowDetails = () => {
    console.log("user wants to edit task id ", task.id);
    onTaskClick(task.id); // Notify TaskList parent
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
      <i className="bx bx-pencil grid-item pointer" onClick={() => onShowDetails()}></i>
      <i className="bx bx-trash-alt grid-item"></i>
    </li>
  );
};

export default ListedTask;
