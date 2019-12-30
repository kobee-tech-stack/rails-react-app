import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { GetTaskQuery, GetTaskQueryVariables } from "../../generated/graphql";
const GET_TASK = loader("../../graphql/getTask.graphql");

export const useTask = (id: number) => {
  const { data, error, loading } = useQuery<
    GetTaskQuery,
    GetTaskQueryVariables
  >(GET_TASK, { variables: { id: id } });
  return { data, error, loading };
};
