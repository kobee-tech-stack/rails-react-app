import { useQuery } from "@apollo/client";
import { GetTasksQuery } from "../../generated/graphql";
import { loader } from "graphql.macro";
const GET_TASKS = loader("../../graphql/getTasks.graphql");

export const useTasks = () => {
  const { data, error, loading, refetch } = useQuery<GetTasksQuery>(GET_TASKS);
  return { data, error, loading, refetch };
};
