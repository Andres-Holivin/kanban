import { Box, Button, Text } from "@chakra-ui/react";
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useDraggable, useDroppable, useSensor, useSensors,DragOverlay } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy,arrayMove,useSortable,horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import { LayoutTheme } from "../../Constant/theme";
import KanbanItem from "./KanbanItem";
import { CSS, } from '@dnd-kit/utilities';

export default function KanbanContainer(props) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )
    const [items, setitems] = useState({
        c1: ["c11", "c12", "c13"],
        c2: []
    });
    const [activeId, setActiveId] = useState();
    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
        >
        <Droppable key="c1" id="c1">
        <Text>Drop here</Text>
        <SortableContext id='c1' items={items.c1} strategy={horizontalListSortingStrategy}>
          {items.c1.map(id => <SortableItem key={id} id={id} />)}
        </SortableContext>
      </Droppable>
      <Droppable key="c2" id="c2">
        <Text>Drop here</Text>
        <SortableContext id='c2' items={items.c2} strategy={horizontalListSortingStrategy}>
          {items.c2.map(id => <SortableItem key={id} id={id} />)}
        </SortableContext>
      </Droppable>
      <DragOverlay>{activeId ? <Box w="50px" h="50px" bg="yellow" >{activeId}</Box> : null}</DragOverlay>
            {/* {
                props.data.map((item) => {
                    return <SortableKanban
                        key={item.id}
                        id={item.id}
                        child={item.items}
                    />
                })
            } */}
        </DndContext>
    );
    function findContainer(id) {
        // let items = props.data;
        if (id in items) return id;
        var tempData = Object.keys(items).find((key) => items[key].includes(id))
        return tempData
    }
    function handleDragStart(event) {
        const { active } = event;
        const { id } = active;
        setActiveId(id);
    }
    function handleDragOver(event) {
        // let items=props.data;
        const { active, over } = event;
        const { id } = active;
        const { id: overId } = over;
        const activeContainer = findContainer(active.data.current.sortable.containerId);
        const overContainer = findContainer(overId);
        if (!activeContainer || !overContainer || activeContainer === overContainer) return;
        setitems((prev) => {
            const activeItems = prev[activeContainer];
            const overItems = prev[overContainer];

            // Find the indexes for the items
            const activeIndex = activeItems.indexOf(id);
            const overIndex = overItems.indexOf(overId);

            let newIndex;
            if (overId in prev) {
                // We're at the root droppable of a container
                newIndex = overItems.length + 1;
            } else {
                const isBelowLastItem = over && active.rect.current.translated && active.rect.current.translated.top > over.rect.offsetTop + over.rect.height;

                const modifier = isBelowLastItem ? 1 : 0;

                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }
            let newActive = prev[activeContainer].filter((item) => item !== active.id)

            return {
                ...prev,
                [activeContainer]: newActive,
                [overContainer]: [
                    ...prev[overContainer].slice(0, newIndex),
                    items[activeContainer][activeIndex],
                    ...prev[overContainer].slice(newIndex, prev[overContainer].length)
                ]
            };
        });
    }
    function handleDragEnd(event) {
        const { active, over } = event;
        const { id } = active;
        const { id: overId } = over;

        const activeContainer = findContainer(active.data.current.sortable.containerId);
        const overContainer = findContainer(overId);
        if (!activeContainer || !overContainer || activeContainer !== overContainer) return;

        const activeIndex = items[activeContainer].indexOf(active.id);
        const overIndex = items[overContainer].indexOf(overId);

        if (activeIndex !== overIndex) {
            setitems((items) => ({
                ...items,
                [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
            }));
        }

        setActiveId(null);
    }
};
export function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
      id: props.id,
    });
    const style = {
      color: isOver ? 'green' : undefined,
    };
  
  
    return (
      <Box bg="red" w="250px" h="250px" ref={setNodeRef} style={style}>
        {props.children}
      </Box>
    );
  }
  export function SortableItem(props) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id: props.id });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
    return (
      <Button ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {props.id}
      </Button>
  
    )
  }
  export function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: props.id,
    });
    const style = transform ? {
      transform: CSS.Transform.toString(transform),
    } : undefined;
    return (
      <Button ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {props.id}
      </Button>
    );
  }
export function SortableKanban(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });
    return (
        <Box bg={LayoutTheme} w="250px" h="100%" ref={setNodeRef} >
            <SortableContext id={props.id} items={props.child} strategy={verticalListSortingStrategy}>
                {props.child.map((item) => {
                    return <KanbanItem
                        key={item.id}
                        contribute={item.contribute}
                        title={item.title}
                    />
                })}
            </SortableContext>
        </Box>
    );
}
