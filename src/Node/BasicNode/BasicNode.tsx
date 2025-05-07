import cx from "classnames";
import { nanoid } from "nanoid";
import {
  useEffect,
  useRef,
  type FormEventHandler,
  type KeyboardEventHandler,
} from "react";
import { useAppState } from "../../state/AppStateContext";
import type { NodeData, NodeTypes } from "../../utils/types";
import { CommandPanel } from "../CommandPanel/CommandPanel";
import styles from "../Node.module.css";
type BasicNodeProps = {
  node: NodeData;
  updateFousedIndex(index: number): void;
  index: number;
  isFocused: boolean;
};

export const BasicNode = ({
  node,
  isFocused,
  index,
  updateFousedIndex,
}: BasicNodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const showCommandPanel = isFocused && node.value.match(/^\//);

  const { changeNodeValue, addNode, removeNodeByIndex, changeNodeType } =
    useAppState();
  useEffect(() => {
    if (isFocused) {
      nodeRef.current?.focus();
    } else {
      nodeRef.current?.blur();
    }
  }, [isFocused]);

  useEffect(() => {
    if (nodeRef.current && !isFocused) {
      nodeRef.current.textContent = node.value;
    }
  }, [node]);
  const handleInput: FormEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    const { textContent } = currentTarget;
    changeNodeValue(index, textContent || "");
  };

  const handleClick = () => {
    updateFousedIndex(index);
  };
  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    if (e.key === "Enter") {
      e.preventDefault();
      if (target.textContent?.[0] === "/") {
        return;
      }
      addNode({ type: node.type, value: "", id: nanoid() }, index + 1);
      updateFousedIndex(index + 1);
    }
    if (e.key == "Backspace") {
      if (target.textContent?.length === 0) {
        e.preventDefault();
        removeNodeByIndex(index);
        updateFousedIndex(index - 1);
      } else if (window.getSelection()?.anchorOffset === 0) {
        e.preventDefault();
        removeNodeByIndex(index - 1);
        updateFousedIndex(index - 1);
      }
    }
  };

  const parseCommand = (nodeType: NodeTypes) => {
    if (nodeRef.current) {
      changeNodeType(index, nodeType);
      nodeRef.current.textContent = "";
    }
  };

  return (
    <>
      {showCommandPanel ? (
        <CommandPanel nodeText={node.value} selectItem={parseCommand} />
      ) : (
        <></>
      )}
      <div
        onInput={handleInput}
        onClick={handleClick}
        onKeyDown={onKeyDown}
        ref={nodeRef}
        className={cx(styles.node, styles[node.type])}
        contentEditable
        suppressContentEditableWarning
      />
    </>
  );
};
