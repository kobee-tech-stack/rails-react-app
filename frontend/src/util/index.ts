import { Task as TaskJsonModel } from "../generated/graphql";
import { Task } from "../context/state";

export const arrayFromConnection = (
  node: ReadonlyArray<TaskJsonModel>
): ReadonlyArray<Task> =>
  node.map<Task>(task => ({
    id: task.id,
    title: task.title,
    description: task.description
  }));

export const toTask = (task: TaskJsonModel): Task => ({
  id: task.id,
  title: task.title,
  description: task.description
});
