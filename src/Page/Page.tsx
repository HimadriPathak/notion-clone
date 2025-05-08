import { DndContext, DragOverlay, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { nanoid } from "nanoid";
import { NodeContainer } from "../Node/NodeContainer/NodeContainer";
import { useAppState } from "../state/AppStateContext";
import { Cover } from "./Cover/Cover";
import { useFocusedNodeIndex } from "./CustomHook/useFocusedNodeIndex";
import styles from "./Page.module.css";
import { Spacer } from "./Spacer/Spacer";
import { Title } from "./Title/Title";
export const Page = () => {
  const {
    title,
    setTitle,
    nodes,
    addNode,
    reorderNodes,
    cover,
    setCoverImage,
  } = useAppState();
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });
  const handleDragEvent = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over?.id && active.id !== over.id) {
      reorderNodes(active.id as string, over.id as string);
    }
  };
  return (
    <div className={styles.body}>
      <Cover changePageCover={setCoverImage} filePath={cover} />
      <div>
        <Title title={title} changePageTitle={setTitle} addNode={addNode} />
        <DndContext onDragEnd={handleDragEvent}>
          <SortableContext items={nodes} strategy={verticalListSortingStrategy}>
            {nodes.map((item, index) => (
              <NodeContainer
                key={item.id}
                node={item}
                index={index}
                isFocused={focusedNodeIndex === index}
                updateFousedIndex={setFocusedNodeIndex}
              />
            ))}
          </SortableContext>
          <DragOverlay />
        </DndContext>
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
