import React, { Dispatch, useContext, useReducer } from "react";
import { QueryResult } from "@apollo/client/react/types/types";
import { useParams } from "react-router-dom";
import { useTask } from "../common/useTask";
import { State } from "../state/taskShow";
import { initialState } from "../state/taskEdit";

export enum ActionType {
  INITIALIZE = "INITIALIZE"
}

interface Action {
  type: ActionType;
  payload: any;
}

type InitialContext = Readonly<{
  fetchResult: Pick<QueryResult, "data" | "loading" | "error">;
  state: State;
  dispatch: Dispatch<Action>;
}>;

const taskReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.INITIALIZE: {
      return { ...state, task: action.payload };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

const TaskShowContext = React.createContext<InitialContext | undefined>(
  undefined
);

export const useShowTask = () => {
  const context = useContext(TaskShowContext);
  if (!context) {
    throw new Error(`useCount must be used within a Provider`);
  }
  return context;
};

export const TaskShowProvider: React.FC<{}> = React.memo(({ children }) => {
  const { id } = useParams();
  const { data, error, loading } = useTask(Number(id));
  const [state, dispatch] = useReducer(taskReducer, initialState);
  return (
    <TaskShowContext.Provider
      value={{
        state,
        dispatch,
        fetchResult: { data: data, error: error, loading: loading }
      }}
    >
      {children}
    </TaskShowContext.Provider>
  );
});
