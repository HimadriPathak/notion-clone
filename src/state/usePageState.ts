import { useImmer } from "use-immer";
import type { NodeData, NodeTypes, Page } from "../utils/types";

export const usePageState = (initialState: Page) => {
  const [page, setPage] = useImmer(initialState);

  const addNode = (node: NodeData, index: number) => {
    setPage((draft) => draft.nodes.splice(index, 0, node));
  };

  const removeNodeByIndex = (index: number) => {
    setPage((draft) => draft.nodes.splice(index, 1));
  };

  const changeNodeValue = (index: number, value: string) => {
    setPage((draft) => {
      draft.nodes[index].value = value;
    });
  };

  const changeNodeType = (index: number, type: NodeTypes) =>
    setPage((draft) => {
      draft.nodes[index].type = type;
      draft.nodes[index].value = "";
    });

  const setNodes = (nodes: NodeData[]) => {
    setPage((draft) => {
      draft.nodes = nodes;
    });
  };

  const setTitle = (title: string) => {
    setPage((draft) => {
      draft.title = title;
    });
  };
  const setCoverImage = (coverImage: string) => {
    setPage((draft) => {
      draft.cover = coverImage;
    });
  };
  return {
    nodes: page.nodes,
    title: page.title,
    cover: page.cover,
    addNode,
    removeNodeByIndex,
    changeNodeType,
    changeNodeValue,
    setNodes,
    setTitle,
    setCoverImage,
  };
};
