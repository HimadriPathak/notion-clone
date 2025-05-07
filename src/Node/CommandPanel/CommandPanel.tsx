import cx from "classnames";
import { useEffect, useState } from "react";
import type { NodeTypes } from "../../utils/types";
import { useOverflowScreenBottom } from "../CustomHook/useOverflowScreenBottom";
import styles from "./CommandPanel.module.css";
type CommandPanelProps = {
  nodeText: string;
  selectItem: (nodeType: NodeTypes) => void;
};

type SupportedNodeType = {
  value: NodeTypes;
  name: string;
};

const supportedNodeTypes: SupportedNodeType[] = [
  { value: "text", name: "Text" },
  { value: "list", name: "List" },
  { value: "page", name: "Page" },
  { value: "image", name: "Image" },
  { value: "heading1", name: "Heading 1" },
  { value: "heading2", name: "Heading 2" },
  { value: "heading3", name: "Heading 3" },
  { value: "heading4", name: "Heading 4" },
  { value: "heading5", name: "Heading 5" },
];
export const CommandPanel = ({ nodeText, selectItem }: CommandPanelProps) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { overflow, ref } = useOverflowScreenBottom();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        selectItem(supportedNodeTypes[selectedItemIndex].value);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectItem, selectedItemIndex]);
  useEffect(() => {
    const normalizedValue = nodeText.toLowerCase().replace(/\//, "");
    setSelectedItemIndex(
      supportedNodeTypes.findIndex((item) => item.value.match(normalizedValue))
    );
  }, [nodeText]);
  return (
    <div
      ref={ref}
      className={cx(styles.panel, {
        [styles.reverse]: overflow,
      })}
    >
      <div className={styles.title}>Blocks</div>
      <ul>
        {supportedNodeTypes.map((type, index) => {
          const selected = selectedItemIndex === index;
          return (
            <li
              key={type.value}
              onClick={() => selectItem(type.value)}
              className={cx({
                [styles.selected]: selected,
              })}
            >
              {type.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
