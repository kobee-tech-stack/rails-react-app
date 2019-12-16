import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchTasks, TaskJsonModel } from "../network";
import { Card, Link, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

export type Task = Readonly<{
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
    <>
      {tasks.map((task, index) => (
        <Card
          key={index}
          style={{ marginBottom: "10px", padding: "10px", width: "300px" }}
        >
          <Typography variant={"h5"}>{task.title}</Typography>
          <Typography>{task.description}</Typography>
          <Link href={`./task/${task.id}/edit`}>
            <EditIcon />
          </Link>
          <Link href={`./task/${task.id}`}>詳細</Link>
        </Card>
      ))}
    </>
  );
};

export const taskMapper = (data: TaskJsonModel): Task => ({
  id: data.id,
  title: data.title,
  description: data.description,
  limitDate: data.limit_date
});
