import React from "react";

const TaskInput = () => {
  return (
    <>
      <p>Qu'avez-vous à faire ?</p>
      <form autoComplete="off">
        <input
          type="text"
          name="todos"
          id="todos"
          required
          placeholder="Add Task"
        />

        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default TaskInput;
