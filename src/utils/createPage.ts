import { nanoid } from "nanoid";
import type { Page } from "./types";

export const createPage = () => {
  const slug = nanoid();
  const id = nanoid();

  const page: Page = {
    id,
    slug,
    title: "Untitled",
    nodes: [],
    cover: "notion-clone-cover-image.png",
  };
  return page;
};
