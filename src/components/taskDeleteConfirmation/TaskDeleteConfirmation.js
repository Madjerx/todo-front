import React from "react";
import "./taskDeleteConfirmation.css";

const TaskDeleteConfirmation = ({ confirmationResp }) => {
  const handleResp = (boolean) => {
    confirmationResp(boolean);
  };
  return (
    <div className="confirmation">
      <span className="confirm-yes pointer" onClick={() => handleResp(true)}>
        Confirm
      </span>
      <span className="confirm-no pointer" onClick={() => handleResp(false)}>
        Cancel
      </span>
    </div>
  );
};

export default TaskDeleteConfirmation;
