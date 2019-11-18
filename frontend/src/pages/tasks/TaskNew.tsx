import * as React from "react";
import { useCallback, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { createTask } from "../../network";

export const TaskNew: React.FC = () => {
  const initialCreateTaskParams = {
    title: "",
    description: ""
  };

  const [createTaskPrams, setCreateTaskParams] = useState({
    ...initialCreateTaskParams
  });

  const handleTextChange = useCallback(e => {
    const currentValue = e.target.value;
    setCreateTaskParams(prevState => ({
      ...prevState,
      title: currentValue
    }));
  }, []);

  const handleChangeDescription = useCallback(e => {
    const currentValue = e.target.value;
    setCreateTaskParams(prevState => ({
      ...prevState,
      description: currentValue
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    await createTask(createTaskPrams).then(result => console.log(result));
  }, [createTaskPrams]);

  return (
    <div>
      <Typography>新規作成</Typography>
      <div>
        <TextField value={createTaskPrams.title} onChange={handleTextChange} />
      </div>
      <div>
        <TextField
          value={createTaskPrams.description}
          onChange={handleChangeDescription}
        />
      </div>
      <Button variant={"outlined"} onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};
