import React, { useEffect } from "react";
import { loadTasks, useHomeState } from "../context/home";
import { Button, CircularProgress } from "@material-ui/core";
import { useTasks } from "../context/home/useTasks";
import { arrayFromConnection } from "../util";
import { TaskList } from "../component/TasklList";

export const TaskListContainer: React.FC = () => {
  const { data, error, loading } = useTasks();
  const [{ tasks }, dispatch] = useHomeState();

  useEffect(() => {
    (async () => {
      // @ts-ignore
      await loadTasks(dispatch, arrayFromConnection(data?.tasks?.nodes ?? []));
    })();
  }, [data, dispatch]);

  if (error) {
    throw new Error(error.message);
  }

  if (loading) {
    return <CircularProgress />;
  }

  // TODO: refetchの処理
  return <TaskList taskList={tasks} />;
};
