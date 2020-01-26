import { HomeState } from "../state";

type Payload = Readonly<{
  errorMessage: string;
}>;

export const failureLoadTasksReducer = (
  state: HomeState,
  payload: Payload
): HomeState => ({
  ...state,
  errorMessage: payload.errorMessage
});
