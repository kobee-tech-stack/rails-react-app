import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchTasks, TaskJsonModel } from "../network";
import { Card } from "@material-ui/core";

type Task = Readonly<{
  id: number;
  title: string;
  limitDate: string | null;
  description: string;
}>;

export const Home: React.FC = () => {
  const [tasks, setTasks] = useState<ReadonlyArray<Task>>([]);
  useEffect(() => {
    (async () => {
      const { data } = await fetchTasks();
      const result = await data.map((task: TaskJsonModel) => taskMapper(task));
      setTasks(result);
    })();
  }, []);
  return (
    <Card>
      {tasks.map((task, index) => (
        <div key={index}>{task.title}</div>
      ))}
    </Card>
  );
};

const taskMapper = (data: TaskJsonModel): Task => ({
  id: data.id,
  title: data.title,
  description: data.description,
  limitDate: data.limit_date
});
