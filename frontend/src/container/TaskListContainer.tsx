import React, { useEffect } from "react";
import { loadTasks, useHomeState } from "../context/home";
import { Button, CircularProgress, Typography } from "@material-ui/core";
import { useTasks } from "../context/home/useTasks";
import { arrayFromConnection } from "../util";
import { TaskList } from "../component/TasklList";

export const TaskListContainer: React.FC = () => {
  const { data, error, loading, refetch } = useTasks();
  const [{ tasks }, dispatch] = useHomeState();

  useEffect(() => {
    (async () => {
      // @ts-ignore
      await loadTasks(dispatch, arrayFromConnection(data?.tasks?.nodes ?? []));
    })();
  }, [data, dispatch]);

  if (error) {
    return <Refetch errorMessage={error.message} refetch={refetch} />;
  }

  if (loading) {
    return <CircularProgress />;
  }

  return <TaskList taskList={tasks} />;
};

type RefetchProps = Readonly<{
  errorMessage: string;
  refetch: any; // TODO: add type
}>;

const Refetch: React.FC<RefetchProps> = React.memo(
  ({ refetch, errorMessage }: RefetchProps) => (
    <div>
      <Typography>{errorMessage}</Typography>
      <Button onClick={() => refetch()}>再取得</Button>
    </div>
  )
);
