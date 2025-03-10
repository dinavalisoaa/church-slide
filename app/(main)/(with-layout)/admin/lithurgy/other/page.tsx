'use client';
import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import  SortableItem  from '../grid/sortable-item';

export default function GridPage() {
    const [items, setItems] = useState([
        { id: '1', content: 'ItemGrid 1', imageUrl: 'https://via.placeholder.com/100?text=Item+1' },
        { id: '2', content: 'ItemGrid 2', imageUrl: 'https://via.placeholder.com/100?text=Item+2' },
        { id: '3', content: 'ItemGrid 3', imageUrl: 'https://via.placeholder.com/100?text=Item+3' },
    ]);
    const [beforeId, setBeforeId] = useState(''); // Input for before card ID

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setItems((currentItems) => {
                const activeIndex = currentItems.findIndex((item) => item.id === active.id);
                const overIndex = currentItems.findIndex((item) => item.id === over.id);
                return arrayMove(currentItems, activeIndex, overIndex);
            });
        }
    };

    const handleRemove = (id: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    };

    const addCardAfter = (targetId: string) => {
        const newCard = {
            id: `${Date.now()}`,
            content: 'New Card',
            imageUrl: 'https://via.placeholder.com/100?text=New+Card',
        };

        setItems((currentItems) => {
            const targetIndex = currentItems.findIndex((item) => item.id === targetId);
            if (targetIndex === -1) {
                console.warn('Target ID not found');
                return [...currentItems, newCard]; // Append if not found
            }

            const insertIndex = targetIndex + 1;
            return [
                ...currentItems.slice(0, insertIndex),
                newCard,
                ...currentItems.slice(insertIndex),
            ];
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* Dynamic input for selecting where to insert */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Enter ID of card to insert after"
                    value={beforeId}
                    onChange={(e) => setBeforeId(e.target.value)}
                    style={{ padding: '5px', marginRight: '10px' }}
                />
                <button
                    onClick={() => addCardAfter(beforeId)}
                    style={{
                        padding: '10px 20px',
                        background: '#0070f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Add Card After
                </button>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items.map((item) => item.id)} strategy={rectSortingStrategy}>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '15px',
                            maxWidth: '500px',
                        }}
                    >
                        {items.map((item) => (
                            <SortableItem
                                key={item.id}
                                id={item.id}
                                content={item.content}
                                imageUrl={item.imageUrl}
                                onRemove={handleRemove}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}