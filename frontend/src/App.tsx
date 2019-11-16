import React, { useEffect, useState } from "react";
import { fetchTasks, TaskJsonModel } from "./network";

type Task = Readonly<{
  id: number;
  title: string;
  limitDate: string | null;
  description: string;
}>;

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<ReadonlyArray<Task>>([]);
  useEffect(() => {
    (async () => {
      const { data } = await fetchTasks();
      const result = await data.map((task: TaskJsonModel) => taskMapper(task));
      setTasks(result);
    })();
  }, []);
  return (
    <div>
      {tasks.map(task => (
        <div>{task.title}</div>
      ))}
    </div>
  );
};

const taskMapper = (data: TaskJsonModel): Task => ({
  id: data.id,
  title: data.title,
  description: data.description,
  limitDate: data.limit_date
});
