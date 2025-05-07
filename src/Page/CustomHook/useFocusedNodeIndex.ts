import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { NodeData } from "../../utils/types";

type useFocusedNodeIndexProps = {
  nodes: NodeData[];
};

export const useFocusedNodeIndex = ({
  nodes,
}: useFocusedNodeIndexProps): [number, Dispatch<SetStateAction<number>>] => {
  const [focusedNodeIndex, setFocusedNodeIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        setFocusedNodeIndex((prevIdx) => Math.max(prevIdx - 1, 0));
      }
      if (event.key === "ArrowDown") {
        setFocusedNodeIndex((prevIdx) =>
          Math.min(prevIdx + 1, nodes.length - 1)
        );
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => removeEventListener("keydown", onKeyDown);
  }, [nodes]);

  return [focusedNodeIndex, setFocusedNodeIndex];
};
