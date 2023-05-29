import React, { useState } from "react";
import "./listedTask.css";

const ListedTask = ({ task }) => {
  const [mockedCheck, setMockedCheck] = useState(task.done);
  return (
    <li>
      <input
      className="grid-item"
        type="checkbox"
        id={task.id}
        checked={mockedCheck}
        onChange={() => setMockedCheck(!mockedCheck)}
      />
      <span className={mockedCheck ? "completed grid-item" : "grid-item"}>{task.title}</span>
      <span className="grid-item priority-item">{task.priority}</span>
      <i class="bx bx-pencil grid-item"></i>
      <i class="bx bx-trash-alt grid-item"></i>
    </li>
  );
};

export default ListedTask;
