import { useQuery } from "@apollo/client";
import { GetTasksQuery, GetTasksQueryVariables } from "../../generated/graphql";
import { loader } from "graphql.macro";
const GET_TASKS = loader("../../graphql/getTasks.graphql");

export const useTasks = () =>
  useQuery<GetTasksQuery, GetTasksQueryVariables>(GET_TASKS);
