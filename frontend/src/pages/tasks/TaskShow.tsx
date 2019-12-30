import * as React from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import { ActionType, useShowTask } from "../../context/show";
import { toTask } from "../../util";
import { useEffect } from "react";

export const TaskShow: React.FC = React.memo(() => {
  const {
    state,
    dispatch,
    fetchResult: { data, error }
  } = useShowTask();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return <CircularProgress />;
  }

  const task = toTask(data.task);

  useEffect(() => {
    dispatch({ type: ActionType.INITIALIZE, payload: task });
  }, [dispatch]);

  return (
    <>
      <>
        <Typography>{state.task?.id}</Typography>
        <Typography>{state.task?.title}</Typography>
        <Typography>{state.task?.description}</Typography>
      </>
    </>
  );
});
