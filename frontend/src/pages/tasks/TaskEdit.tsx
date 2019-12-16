import * as React from "react";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { fetchTask, updateTask } from "../../network";
import { Task, taskMapper } from "../Home";
import { Button, TextField } from "@material-ui/core";

export const TaskEdit: React.FC = () => {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);

  const handleTitleChange = useCallback(e => {
    const currentValue = e.target.value;
    setTask(prevState => {
      return prevState
        ? {
            ...prevState,
            title: currentValue
          }
        : null;
    });
  }, []);

  const handleDescriptionChange = useCallback(e => {
    const currentValue = e.target.value;
    setTask(prevState => {
      return prevState
        ? {
            ...prevState,
            description: currentValue
          }
        : null;
    });
  }, []);

  const handleSubmitButtonClick = useCallback(async () => {
    if (task) {
      await updateTask(task).then(result => console.log(result));
    }
  }, [task]);

  useEffect(() => {
    (async () => {
      if (id) {
        const { data } = await fetchTask(id);
        setTask(taskMapper(data));
      }
    })();
  }, [id]);

  return (
    <div>
      {task && (
        <>
          <div>
            <TextField value={task.title} onChange={handleTitleChange} />
          </div>
          <div>
            <TextField
              value={task.description}
              onChange={handleDescriptionChange}
            />
          </div>
        </>
      )}
      <Button
        variant={"contained"}
        color={"primary"}
        onClick={handleSubmitButtonClick}
      >
        Submit
      </Button>
    </div>
  );
};
