export type NodeTypes =
  | "text"
  | "image"
  | "list"
  | "page"
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5";

export type NodeData = {
  id: string;
  type: NodeTypes;
  value: string;
};

export type Page = {
  id: string;
  slug: string;
  title: string;
  nodes: NodeData[];
  cover: string;
};
