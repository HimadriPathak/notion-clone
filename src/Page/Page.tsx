import { nanoid } from "nanoid";
import { BasicNode } from "../Node/BasicNode";
import { useAppState } from "../state/AppStateContext";
import { Cover } from "./Cover/Cover";
import { useFocusedNodeIndex } from "./CustomHook/useFocusedNodeIndex";
import styles from "./Page.module.css";
import { Spacer } from "./Spacer/Spacer";
import { Title } from "./Title/Title";
export const Page = () => {
  const { title, setTitle, nodes, addNode } = useAppState();
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });

  return (
    <div className={styles.body}>
      <Cover />
      <div>
        <Title title={title} changePageTitle={setTitle} addNode={addNode} />
        {nodes.map((item, index) => (
          <BasicNode
            key={item.id}
            node={item}
            index={index}
            isFocused={focusedNodeIndex === index}
            updateFousedIndex={setFocusedNodeIndex}
          />
        ))}
        <Spacer
          showHint={!nodes.length}
          handleClick={() => {
            addNode(
              {
                id: nanoid(),
                value: "",
                type: "text",
              },
              nodes.length
            );
          }}
        />
      </div>
    </div>
  );
};
