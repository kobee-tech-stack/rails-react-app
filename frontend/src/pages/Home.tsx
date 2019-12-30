import * as React from "react";
import { Card, CircularProgress, Link, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useHome } from "../context/home";
import { arrayFromConnection } from "../util";

export const Home: React.FC = () => {
  const { error, data } = useHome();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return <CircularProgress />;
  }

  const tasks = arrayFromConnection(data.tasks.nodes);
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
