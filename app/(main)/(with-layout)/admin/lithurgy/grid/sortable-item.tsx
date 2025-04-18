import React, { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ItemGrid, { ItemProps } from "./item-grid";

const SortableItem: FC<ItemProps> = (props) => {
    const {
        isDragging,
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined,
    };

    return (
        <ItemGrid
            ref={setNodeRef}
            style={style}
            withOpacity={isDragging}
            {...props}
            {...attributes}
            {...listeners}
        />
    );
};

export default SortableItem;
