import { createContext, useContext } from "react";
import { useTasks } from "./useTasks";
import * as React from "react";
import { QueryResult } from "@apollo/client/react/types/types";

const HomeContext = createContext<
  Pick<QueryResult, "data" | "loading" | "error"> | undefined
>(undefined);

export const useHome = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error(`useCount must be used within a Provider`);
  }
  return context;
};

export const HomeProvider: React.FC<{}> = ({ children }) => {
  const { data, error, loading } = useTasks();
  return (
    <HomeContext.Provider value={{ data, error, loading }}>
      {children}
    </HomeContext.Provider>
  );
};
