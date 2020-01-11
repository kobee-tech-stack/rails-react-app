import { storiesOf } from "@storybook/react";
import React from "react";
import { TaskItem } from "../component/TskItem";

storiesOf("TaskItem", module).add("通常", () => (
  <TaskItem
    task={{
      id: "1",
      title: "サッカーする",
      description: "放課後に",
      limitDate: null
    }}
  />
));
