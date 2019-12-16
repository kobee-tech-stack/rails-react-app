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

type TaskCreateParams = Readonly<{
  title: string;
  description: string;
}>;

type TaskUpdateParams = Readonly<{
  id: number;
  title: string;
  description: string;
}>;

export const fetchTasks = (): Promise<AxiosResponse<
  ReadonlyArray<TaskJsonModel>
>> => axios.get(`${baseUrl}/tasks`);

export const createTask = (
  data: TaskCreateParams
): Promise<AxiosResponse<TaskJsonModel>> =>
  axios.post(`${baseUrl}/tasks`, {
    title: data.title,
    description: data.description
  });

export const fetchTask = (id: string): Promise<AxiosResponse<TaskJsonModel>> =>
  axios.get(`${baseUrl}/tasks/${id}`);

export const updateTask = (
  task: TaskUpdateParams
): Promise<AxiosResponse<TaskJsonModel>> =>
  axios.put(`${baseUrl}/tasks/${task.id}`, { task });

export const deleteTask = (id: string): Promise<AxiosResponse<any>> =>
  axios.delete(`${baseUrl}/tasks/${id}`);
