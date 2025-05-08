import cx from "classnames";
import { useEffect, useRef, type ChangeEventHandler } from "react";
import { FileImage } from "../../components/FileImage";
import { useAppState } from "../../state/AppStateContext";
import type { NodeData } from "../../utils/types";
import { uploadImage } from "../../utils/uploadImage";
import styles from "../Node.module.css";
type ImageNodeProps = {
  node: NodeData;
  index: number;
  isFocused: boolean;
};

export const ImageNode = ({ node, isFocused, index }: ImageNodeProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { removeNodeByIndex, changeNodeType, changeNodeValue } = useAppState();

  useEffect(() => {
    if (!node.value || node.value.length === 0) {
      fileInputRef.current?.click();
    }
  }, [node.value]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === "Backspace") {
        removeNodeByIndex(index);
      }
      if (event.key === "Enter") {
        fileInputRef.current?.click();
      }
    };

    if (isFocused) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, removeNodeByIndex, index, node]);
  const onImageUpload: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const target = event.target;
    if (!target.files) {
      changeNodeType(index, "text");
    }
    try {
      const result = await uploadImage(target?.files?.[0]);

      if (result?.filePath) {
        changeNodeValue(index, result.filePath);
      }
    } catch (error) {
      changeNodeType(index, "text");
    }
  };
  return (
    <div
      className={cx(styles.node, styles.image, {
        [styles.focused]: isFocused,
      })}
    >
      <FileImage filePath={node.value} />
      <input
        onChange={onImageUpload}
        style={{ display: "none" }}
        ref={fileInputRef}
        type="file"
      />
    </div>
  );
};
