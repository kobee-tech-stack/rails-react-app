import axios, { AxiosResponse } from "axios";

const baseUrl = "http://localhost:3001/";

export type TaskJsonModel = Readonly<{
  id: number;
  title: string;
  limit_date: string;
  description: string;
  created_at: string;
  updated_at: string;
}>;

export const fetchTasks = (): Promise<AxiosResponse<
  ReadonlyArray<TaskJsonModel>
>> => axios.get(`${baseUrl}/tasks`);

type TaskCreateParams = Readonly<{
  title: string;
  description: string;
}>;

export const createTask = (
  data: TaskCreateParams
): Promise<AxiosResponse<any>> =>
  axios.post(`${baseUrl}/tasks`, {
    title: data.title,
    description: data.description
  });
