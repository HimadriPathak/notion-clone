import { createContext, useContext, type ReactNode } from "react";
import type { Page } from "../utils/types";
import { usePageState } from "./usePageState";

type AppStateContextType = ReturnType<typeof usePageState>;

const AppStateContext = createContext<AppStateContextType>(
  {} as AppStateContextType
);

type AppStateProviderProps = {
  children: ReactNode;
  initialState: Page;
};

export const AppStateProvider = ({
  initialState,
  children,
}: AppStateProviderProps) => {
  const value = usePageState(initialState);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
