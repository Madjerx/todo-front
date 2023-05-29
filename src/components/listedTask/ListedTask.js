import React, { useEffect, useState } from "react";
import "./listedTask.css";

const ListedTask = ({ task, onTaskCheck }) => {
  const [mockedCheck, setMockedCheck] = useState(task.done);

  useEffect(() => {
    setMockedCheck(task.done);
  }, [task]);

  const onCheck = () => {
    const updatedCheck = !mockedCheck;
    setMockedCheck(updatedCheck);
    onTaskCheck(task.id, updatedCheck); // Notify parent
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
      <span className={mockedCheck ? "completed grid-item" : "grid-item"}>
        {task.title}
      </span>
      <span
        className={`${
          ["white", "yellow", "orange", "red"][task.priority]
        } green-${task.done}`}
      >
        <i className="priority-icon bx bxs-circle"></i>{" "}
      </span>
      <i className="bx bx-pencil grid-item"></i>
      <i className="bx bx-trash-alt grid-item"></i>
    </li>
  );
};

export default ListedTask;
