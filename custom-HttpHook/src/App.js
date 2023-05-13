import React, { useCallback, useEffect, useState } from "react";

import NewTask from "./components/NewTask/NewTask";
import Tasks from "./components/Tasks/Tasks";
import useHttp from "./components/hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, dispatchRequest: fetchRequest } = useHttp();

  const fetchTasks = useCallback(() => {
    const transformTasks = (data) => {
      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTasks(loadedTasks);
    };
    fetchRequest(
      {
        url: "https://react-http-5845d-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
      },
      transformTasks
    );
  }, [fetchRequest]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchRequest}
      />
    </React.Fragment>
  );
}

export default App;
