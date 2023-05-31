import React, { useState } from "react";
import "./taskAddForm.css";

const TaskInput = ({ addTask }) => {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState(0);
  const [description, setDescription] = useState("");

  //Methods called on Input change to set corresponding const
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(parseInt(event.target.value));
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  //Method called on submit and pass infos to TaskList parent component
  const onSubmit = (event) => {
    event.preventDefault(); //prevent reload of page after submit
    if (inputValue) {
      addTask(inputValue, priority, description);
      setInputValue("");
      setPriority(0);
      setDescription("");
    }
  };

  return (
    <>
      <form className="center" autoComplete="off" onSubmit={onSubmit}>
        <div className="first-line">
          <input
            type="text"
            name="todos"
            id="todos"
            required
            placeholder="New Task*"
            value={inputValue}
            onChange={handleInputChange}
          />

          <select
            className={priority === 0 && "selected-grey"}
            value={priority}
            onChange={handlePriorityChange}
          >
            <option disabled value={0}>
              Priority
            </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
        <div>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <div className="button-wrap">
          <button className="pointer" type="submit">Add</button>
        </div>
      </form>
    </>
  );
};

export default TaskInput;
