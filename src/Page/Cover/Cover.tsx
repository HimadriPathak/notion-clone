import { useRef } from "react";
import styles from "./Cover.module.css";

export const Cover = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onChangeCoverImage = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className={styles.cover}>
      <img
        src="/notion-clone-cover-image.png"
        alt="default cover Image"
        className={styles.image}
      />
      <button
        type="button"
        className={styles.button}
        onClick={onChangeCoverImage}
      >
        Change Cover
      </button>
      <input
        id="coverImageInput"
        ref={fileInputRef}
        type="file"
        title="Choose a cover image"
        className={styles.hiddenInput}
      />
    </div>
  );
};
