import React from "react";
import { useHome } from "../context/home";
import { CircularProgress } from "@material-ui/core";
import { arrayFromConnection } from "../util";
import { TaskList } from "../component/TasklList";

export const TaskListContainer: React.FC = () => {
  const { error, data } = useHome();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return <CircularProgress />;
  }

  const taskList = arrayFromConnection(data.tasks.nodes);
  return <TaskList taskList={taskList} />;
};
