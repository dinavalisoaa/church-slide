"use client";
import React, { FC, useState, useCallback } from 'react';
import {
    DndContext,
    closestCenter,
    MouseSensor,
    TouchSensor,
    DragOverlay,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from "./sortable-item";
import Grid from "./grid";
import ItemGrid from "./item-grid";

// Define the type for each item
interface Item {
    id: string;
    imageUrl: string;
    text: string;
}

const App: FC = () => {
    // Initialize items with image URLs and text
    const [items, setItems] = useState<Item[]>(
        Array.from({ length: 20 }, (_, i) => ({
            id: (i + 1).toString(),
            imageUrl: `https://picsum.photos/100/100?random=${i + 1}`, // Random image URL
            text: `Item ${i + 1}`, // Example text
        }))
    );

    const [activeId, setActiveId] = useState<string | null>(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    }, []);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
        setActiveId(null);
    }, []);

    const handleDragCancel = useCallback(() => {
        setActiveId(null);
    }, []);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <SortableContext items={items.map((item) => item.id)} strategy={rectSortingStrategy}>
                <Grid columns={5}>
                    {items.map((item) => (
                        <SortableItem key={item.id} id={item.id} imageUrl={item.imageUrl} content={item.text}>
                            <img src={item.imageUrl} alt={item.text} style={{ width: '100%', height: 'auto' }} />
                            <p>{item.text}</p>
                        </SortableItem>
                    ))}
                </Grid>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                {activeId ? (

                    <ItemGrid content={items.find((item) => item.id === activeId)?.text} id={activeId} imageUrl={items.find((item) => item.id === activeId)?.imageUrl}  isDragging >

                        <p>{items.find((item) => item.id === activeId)?.text}</p>
                    </ItemGrid>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default App;