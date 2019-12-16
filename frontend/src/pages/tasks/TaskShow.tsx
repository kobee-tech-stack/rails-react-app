import * as React from "react";
import { useCallback, useEffect } from "react";
import { deleteTask, fetchTask } from "../../network";
import { useParams } from "react-router";
import { useState } from "react";
import { Task, taskMapper } from "../Home";
import { Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export const TaskShow = () => {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);

  const handleDeleteIconClick = useCallback(async () => {
    await deleteTask(id!).then(result => console.log(result));
  }, [id]);

  useEffect(() => {
    (async () => {
      if (id) {
        const { data } = await fetchTask(id);
        setTask(taskMapper(data));
      }
    })();
  }, [id]);
  return (
    <>
      {task && (
        <>
          <Typography>{task.id}</Typography>
          <Typography>{task.title}</Typography>
          <Typography>{task.description}</Typography>
          <DeleteIcon onClick={handleDeleteIconClick} />
        </>
      )}
    </>
  );
};
