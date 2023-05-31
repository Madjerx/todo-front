const API_URL = "http://localhost:8080/api/tasks/";

export const getAllTasks = () => {
  return fetch(`${API_URL}/getTasks`).then((response) => response.json());
};

export const patchOneTask = (taskId, isChecked) => {
  console.log("call patch for task id", taskId);
  return fetch(`${API_URL}${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ done: isChecked }),
  }).then((response) => response.json());
};

export const postOneTask = (taskTitle, priority, description) => {
  return fetch(`${API_URL}addTask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: taskTitle,
      priority: priority,
      description: description,
    }),
  }).then((response) => response.json());
};
