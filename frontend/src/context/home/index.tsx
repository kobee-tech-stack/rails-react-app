import { createContext, useContext } from "react";
import * as React from "react";
import { initialState, HomeState } from "./state";
import { Task } from "../../generated/graphql";
import {
  failureLoadTasksReducer,
  startLoadTasksReducer,
  successLoadTasksReducer
} from "./reducer";

export enum ActionType {
  START_LOAD_TASKS = "START_LOAD_TASKS",
  SUCCESS_LOAD_TASKS = "SUCCESS_LOAD_TASKS",
  FAILURE_LOAD_TASKS = "FAILURE_LOAD_TASKS"
}

type Action = Readonly<
  | {
      type: ActionType.START_LOAD_TASKS;
      payload: {};
    }
  | {
      type: ActionType.SUCCESS_LOAD_TASKS;
      payload: {
        tasks: ReadonlyArray<Task>;
      };
    }
  | {
      type: ActionType.FAILURE_LOAD_TASKS;
      payload: {
        errorMessage: string;
      };
    }
>;

type Dispatch = (action: Action) => void;

const HomeContext = createContext<[HomeState, Dispatch] | undefined>(undefined);

const homeReducer: React.Reducer<HomeState, Action> = (
  state,
  action
): HomeState => {
  switch (action.type) {
    case ActionType.START_LOAD_TASKS: {
      return startLoadTasksReducer(state, {});
    }
    case ActionType.SUCCESS_LOAD_TASKS: {
      return successLoadTasksReducer(state, { tasks: action.payload.tasks });
    }
    case ActionType.FAILURE_LOAD_TASKS: {
      return failureLoadTasksReducer(state, {
        errorMessage: action.payload.errorMessage
      });
    }
    default: {
      throw new Error("Unsupported action type");
    }
  }
};

export const useHomeState = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error(`useCount must be used within a Provider`);
  }
  return context;
};

type HomeProviderProps = Readonly<{
  children: React.ReactNode;
}>;

export const HomeProvider: React.FC<HomeProviderProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(homeReducer, initialState);
  const value = React.useMemo<[HomeState, Dispatch]>(() => [state, dispatch], [
    state
  ]);
  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

// thunk Actionのようなヘルパー関数
export const loadTasks = async (
  dispatch: Dispatch,
  tasks: ReadonlyArray<Task>
) => {
  dispatch({ type: ActionType.START_LOAD_TASKS, payload: {} });
  try {
    dispatch({
      type: ActionType.SUCCESS_LOAD_TASKS,
      payload: { tasks: tasks }
    });
  } catch (e) {
    dispatch({
      type: ActionType.FAILURE_LOAD_TASKS,
      payload: {
        errorMessage: e.toString()
      }
    });
  }
};
