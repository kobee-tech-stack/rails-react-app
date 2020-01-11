import React from "react";
import { Task } from "../context/state";
import { TaskItem } from "./TskItem";

type Props = {
  taskList: ReadonlyArray<Task>;
};

export const TaskList: React.FC<Props> = ({ taskList }: Props) => (
  <div>
    {taskList.map((task, index) => (
      <TaskItem task={task} key={index} />
    ))}
  </div>
);
