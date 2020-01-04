import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { ActionType, useEditTask } from "../../context/edit";
import { toTask } from "../../util";
import { useUpdateTask } from "../../context/common/useUpdateTask";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";

type FormValues = {
  title: string;
  description: string;
};

const editFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, "短すぎます")
    .max(250, "250文字以内の文字数になります")
    .required("Required"),
  description: Yup.string()
    .min(1, "短すぎます")
    .max(300, "250文字以内の文字数になります")
    .required("Required")
});

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

  const { updateTaskMutation } = useUpdateTask();
  const [isRedirectTaskList, setIsRedirectTaskList] = useState<boolean>(false);

  const handleSubmitButtonClick = useCallback(async () => {
    await updateTaskMutation({
      variables: {
        id: Number(state.task?.id),
        title: state.task?.title ?? "",
        description: state.task?.description ?? ""
      }
    });
    setIsRedirectTaskList(true);
  }, [state.task, updateTaskMutation]);

  useEffect(() => {
    dispatch({ type: ActionType.INITIALIZE, payload: task });
  }, [dispatch]);

  const formik = useFormik<FormValues>({
    initialValues: {
      title: state.task?.title ?? "",
      description: state.task?.description ?? ""
    },
    enableReinitialize: true,
    validationSchema: editFormSchema,
    onSubmit: values => {
      console.log(values);
    }
  });

  formik.handleChange = useCallback((e: any) => {
    if (e.target.name === "description") {
      dispatch({
        type: ActionType.CHANGE_DESCRIPTION,
        payload: e.target.value
      });
    } else if (e.target.name === "title") {
      dispatch({
        type: ActionType.CHANGE_TITLE,
        payload: e.target.value
      });
    }
  }, []);

  return (
    <div>
      {isRedirectTaskList ? (
        <Redirect to="/" />
      ) : (
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <TextField
                onChange={formik.handleChange}
                value={formik.values.title}
                name={"title"}
              />
              {formik.errors.title ? <div>{formik.errors.title}</div> : null}
            </div>
            <div>
              <TextField
                onChange={formik.handleChange}
                value={formik.values.description}
                name={"description"}
              />
              {formik.errors.description ? (
                <div>{formik.errors.description}</div>
              ) : null}
            </div>
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={handleSubmitButtonClick}
            >
              Submit
            </Button>
          </form>
        </div>
      )}
    </div>
  );
});
