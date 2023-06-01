import data from "../data/todosData.json";

let mockedData = data;

export const mockedGetAllTasks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockedData);
    }, 30);
  });
};

export const mockedPatchOneTask = (taskId, isChecked) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedData = mockedData.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            done: isChecked,
            updatedAt: new Date().toISOString(),
          };
        }
        return task;
      });
      mockedData = updatedData;
      resolve(mockedData);
      console.log(mockedData);
    }, 120);
  });
};

export const mockedPostOneTask = (taskTitle, priority, description) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTask = {
        id: mockedData.length + 1,
        title: taskTitle,
        priority,
        description,
        done: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockedData.push(newTask);
      resolve(mockedData);
    }, 200);
  });
};

export const mockedDeleteOneTask = (taskId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockedData.findIndex((task) => task.id === taskId);
      if (index !== -1) {
        mockedData.splice(index, 1);
      }
      resolve(mockedData);
    }, 200);
  });
};
