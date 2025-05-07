import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
import type { NodeData } from "../../utils/types";
import styles from "./Title.module.css";

type TitleProps = {
  title: string;
  changePageTitle: (title: string) => void;
  addNode: (node: NodeData, index: number) => void;
};

export const Title = ({ title, changePageTitle, addNode }: TitleProps) => {
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const isFocused = document.activeElement === headerRef.current;
    if (!isFocused && headerRef.current) {
      headerRef.current.textContent = title;
    }
  }, [title]);
  return (
    <div className={styles.container}>
      <h1
        className={styles.title}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => changePageTitle(e.currentTarget.textContent || "")}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addNode({ type: "text", id: nanoid(), value: "" }, 0);
          }
        }}
      ></h1>
    </div>
  );
};
