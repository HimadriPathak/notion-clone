import type { NodeData, NodeTypes } from "../../utils/types";
import { BasicNode } from "../BasicNode/BasicNode";
import { ImageNode } from "../ImageNode/ImageNode";
import { PageNode } from "../PageNode/PageNode";
type NodeTypeSwitcherProps = {
  node: NodeData;
  updateFousedIndex(index: number): void;
  index: number;
  isFocused: boolean;
};

const TEXT_NODE_TYPES: NodeTypes[] = [
  "text",
  "list",
  "heading1",
  "heading2",
  "heading3",
  "heading4",
  "heading5",
];
export const NodeTypeSwitcher = ({
  node,
  isFocused,
  index,
  updateFousedIndex,
}: NodeTypeSwitcherProps) => {
  if (TEXT_NODE_TYPES.includes(node.type)) {
    return (
      <BasicNode
        node={node}
        index={index}
        isFocused={isFocused}
        updateFousedIndex={updateFousedIndex}
      />
    );
  }
  if (node.type === "page") {
    return <PageNode node={node} index={index} isFocused={isFocused} />;
  }
  if (node.type === "image") {
    return <ImageNode node={node} index={index} isFocused={isFocused} />;
  }
  return null;
};
