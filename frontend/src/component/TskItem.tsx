import { Task } from "../context/state";
import React from "react";
import { Card, Link, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

type Props = {
  task: Task;
};

export const TaskItem: React.FC<Props> = ({ task }: Props) => (
  <div>
    <Card style={{ marginBottom: "10px", padding: "10px", width: "300px" }}>
      <Typography variant={"h5"}>{task.title}</Typography>
      <Typography>{task.description}</Typography>
      <Link href={`./task/${task.id}/edit`}>
        <EditIcon />
      </Link>
      <Link href={`./task/${task.id}`}>詳細</Link>
    </Card>
  </div>
);
