import React, { Dispatch, useContext, useReducer } from "react";
import { QueryResult } from "@apollo/client/react/types/types";
import { useTask } from "../common/useTask";
import { useParams } from "react-router-dom";
import { State, initialState } from "../state/taskEdit";

type InitialContext = Readonly<{
  fetchResult: Pick<QueryResult, "data" | "loading" | "error">;
  state: State;
  dispatch: Dispatch<Action>;
}>;

const EditTaskContext = React.createContext<InitialContext | undefined>(
  undefined
);

export const useEditTask = () => {
  const context = useContext(EditTaskContext);
  if (!context) {
    throw new Error(`useCount must be used within a Provider`);
  }
  return context;
};

export enum ActionType {
  CHANGE_TITLE = "CHANGE_TITLE",
  CHANGE_DESCRIPTION = "CHANGE_DESCRIPTION",
  INITIALIZE = "INITIALIZE",
  SUBMIT = "SUBMIT"
}

interface Action {
  type: ActionType;
  payload: any;
}

const taskReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.CHANGE_TITLE: {
      return {
        ...state,
        task: {
          ...state.task,
          title: action.payload
        }
      };
    }
    case ActionType.CHANGE_DESCRIPTION: {
      return {
        ...state,
        task: {
          ...state.task,
          description: action.payload
        }
      };
    }
    case ActionType.INITIALIZE: {
      return { ...state, task: action.payload };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

export const EditTaskProvider: React.FC<{}> = ({ children }) => {
  const { id } = useParams();
  const { data, error, loading } = useTask(Number(id));
  const [state, dispatch] = useReducer(taskReducer, initialState);
  return (
    <EditTaskContext.Provider
      value={{
        state,
        dispatch,
        fetchResult: { data: data, error: error, loading: loading }
      }}
    >
      {children}
    </EditTaskContext.Provider>
  );
};
