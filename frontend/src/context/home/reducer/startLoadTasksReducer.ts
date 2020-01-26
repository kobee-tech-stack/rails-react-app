import { HomeState } from "../state";

type Payload = Readonly<{}>;

export const startLoadTasksReducer = (
  state: HomeState,
  payload: Payload
): HomeState => ({
  ...state,
  loading: true
});
