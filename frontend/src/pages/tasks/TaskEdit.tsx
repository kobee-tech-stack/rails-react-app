import * as React from "react";
import { useCallback, useEffect } from "react";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { ActionType, useEditTask } from "../../context/edit";
import { toTask } from "../../util";

export const TaskEdit: React.FC = React.memo(() => {
  const {
    state,
    dispatch,
    fetchResult: { error, data }
  } = useEditTask();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return <CircularProgress />;
  }

  const task = toTask(data.task);

  const handleTitleChange = useCallback(
    e => {
      const value = e.target.value;
      dispatch({
        type: ActionType.CHANGE_TITLE,
        payload: value
      });
    },
    [dispatch]
  );

  const handleDescriptionChange = useCallback(
    e => {
      const value = e.target.value;
      dispatch({
        type: ActionType.CHANGE_DESCRIPTION,
        payload: value
      });
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch({ type: ActionType.INITIALIZE, payload: task });
  }, [dispatch]);

  // TODO: mutation
  // const handleSubmitButtonClick = useCallback(async () => {
  //   if (task) {
  //     await updateTask(task).then(result => console.log(result));
  //   }
  // }, [task]);

  return (
    <div>
      <>
        <div>
          <TextField value={state.task?.title} onChange={handleTitleChange} />
        </div>
        <div>
          <TextField
            value={state.task?.description}
            onChange={handleDescriptionChange}
          />
        </div>
      </>
      <Button variant={"contained"} color={"primary"}>
        Submit
      </Button>
    </div>
  );
});
