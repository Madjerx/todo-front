import React from "react";
import "./todoDetails.css";

const TodoDetails = ({ onClose, task }) => {
  //Method to send close action at App parent
  const closeDetails = () => {
    onClose();
  };

  //Method to formatDate to french format
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "fr-FR",
      options
    );
    return formattedDate;
  };
  //Method to formatDate time to french format
  const formatTime = (dateString) => {
    const options = { hour: "numeric", minute: "numeric" };
    const formattedTime = new Date(dateString).toLocaleTimeString(
      "fr-FR",
      options
    );
    return formattedTime;
  };

  return (
    <div className="popup-container">
      <div className="popup-body">
        <h1>{task.title}</h1>
        <div className="priority-data">
          <p>Priority : </p>
          <span
            className={`${
              ["white", "yellow", "orange", "red"][task.priority]
            } green-${task.done}`}
          >
            <i className="priority-icon bx bxs-circle"></i>{" "}
          </span>
        </div>
        <p className="description-data">Description : {!task.description && 'Aucune'}{task.description}</p>
        <div className="dates-data">
          <span className="created-at">
            Created : {formatDate(task.createdAt)} at{" "}
            {formatTime(task.createdAt)}
          </span>
          <span className="updated-at">
            Last update : {formatDate(task.updatedAt)} at{" "}
            {formatTime(task.updatedAt)}
          </span>
        </div>
        <button
          type="button"
          className="close-button"
          onClick={() => closeDetails()}
        >
          Close X
        </button>
      </div>
    </div>
  );
};

export default TodoDetails;
