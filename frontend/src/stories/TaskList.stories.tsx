import { storiesOf } from "@storybook/react";
import { TaskList } from "../component/TasklList";
import React from "react";

storiesOf("TaskList", module).add("通常", () => (
  <TaskList
    taskList={[
      {
        id: "1",
        title: "ラーメン食べる",
        description: "ほどほどに",
        limitDate: null
      },
      {
        id: "2",
        title: "サッカーする",
        description: "放課後に",
        limitDate: null
      }
    ]}
  />
));
