import { HomeState, Task } from "../state";

type Payload = Readonly<{
  tasks: ReadonlyArray<Task>;
}>;

export const successLoadTasksReducer = (
  state: HomeState,
  payload: Payload
): HomeState => ({
  ...state,
  loading: false,
  tasks: payload.tasks
});
