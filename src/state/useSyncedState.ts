import { useEffect, useRef } from "react";
import { useImmer, type ImmerHook } from "use-immer";

export const useSyncedState = <TState>(
  initailState: TState,
  syncCallback: (state: TState) => void
): ImmerHook<TState> => {
  const [state, setState] = useImmer<TState>(initailState);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      syncCallback(state);
    }
    didMountRef.current = true;
  }, [state, setState]);

  return [state, setState];
};
