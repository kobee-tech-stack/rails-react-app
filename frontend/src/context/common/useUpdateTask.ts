import { useMutation } from "@apollo/client";
import { Update_TaskInput, UpdateTaskMutation } from "../../generated/graphql";
import { loader } from "graphql.macro";
const UPDATE_TASK = loader("../../graphql/updateTask.graphql");

export const useUpdateTask = () => {
  const [updateTaskMutation, { data }] = useMutation<
    UpdateTaskMutation,
    Update_TaskInput
  >(UPDATE_TASK);
  return { updateTaskMutation, data };
};
