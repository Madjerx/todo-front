import React from "react";
import './taskAddForm.css'

const TaskInput = () => {
  return (
    <>
      <form className="center" autoComplete="off">
        <input
          type="text"
          name="todos"
          id="todos"
          required
          placeholder="New Task"
        />

        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default TaskInput;
