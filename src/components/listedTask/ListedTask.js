import React, { useEffect, useState } from "react";
import "./listedTask.css";

const ListedTask = ({ task, onTaskCheck }) => {
  const [mockedCheck, setMockedCheck] = useState(task.done);

  useEffect(() => {
    setMockedCheck(task.done);
    console.log("mockedCheck  = ", mockedCheck);
  }, [task]);

  const onCheck = () => {
    const updatedCheck = !mockedCheck;
    setMockedCheck(updatedCheck);
    onTaskCheck(task.id, updatedCheck); // Notify parent
  };

  console.log("called ListedTask = ", task);

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
      <span className="grid-item priority-item">{task.priority}</span>
      <i className="bx bx-pencil grid-item"></i>
      <i className="bx bx-trash-alt grid-item"></i>
    </li>
  );
};

export default ListedTask;
