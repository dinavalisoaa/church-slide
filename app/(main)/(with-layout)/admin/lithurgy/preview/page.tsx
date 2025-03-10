"use client";
import React, { useState } from 'react';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    useSortable,
    rectSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Composant Sortable individuel avec suppression et image
const Sortable = ({ id, content, imageUrl, onRemove, style }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const cardStyle = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        width: '150px', // Augmenté pour mieux intégrer l'image
        height: '200px', // Augmenté pour l'image et le contenu
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        cursor: 'grab',
        padding: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        ...style,
    };

    return (
        <div
            ref={setNodeRef}
            style={cardStyle}
            {...attributes}
            {...listeners}
        >
            {/* Image dans la carte */}
            <img
                src={imageUrl || 'https://via.placeholder.com/100'} // Image par défaut si aucune URL n'est fournie
                alt={content}
                style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                }}
            />
            {/* Contenu texte */}
            <div style={{ textAlign: 'center' }}>{content}</div>
            {/* Bouton de suppression */}
            <button
                onClick={() => onRemove(id)}
                style={{
                    background: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    marginTop: '5px',
                }}
            >
                Supprimer
            </button>
        </div>
    );
};

// Composant de grille principal
const SortableGrid = () => {
    const [items, setItems] = useState([
        { id: '1', content: 'Carte 1', imageUrl: 'https://via.placeholder.com/100?text=Carte+1' },
        { id: '2', content: 'Carte 2', imageUrl: 'https://via.placeholder.com/100?text=Carte+2' },
        { id: '3', content: 'Carte 3', imageUrl: 'https://via.placeholder.com/100?text=Carte+3' },
        { id: '4', content: 'Carte 4', imageUrl: 'https://via.placeholder.com/100?text=Carte+4' },
        { id: '5', content: 'Carte 5', imageUrl: 'https://via.placeholder.com/100?text=Carte+5' },
        { id: '6', content: 'Carte 6', imageUrl: 'https://via.placeholder.com/100?text=Carte+6' },
    ]);

    const sensors = useSensors(useSensor(PointerSensor));

    // Gestion du glisser-déposer
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setItems((currentItems) => {
                const activeIndex = currentItems.findIndex((item) => item.id === active.id);
                const overIndex = currentItems.findIndex((item) => item.id === over?.id);
                return arrayMove(currentItems, activeIndex, overIndex);
            });
        }
    };

    // Gestion de la suppression
    const handleRemove = (id) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items.map((item) => item.id)}
                strategy={rectSortingStrategy}
            >
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '15px',
                        padding: '20px',
                        maxWidth: '500px', // Ajusté pour les cartes plus grandes
                        margin: '0 auto',
                    }}
                >
                    {items.map((item) => (
                        <Sortable
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
    );
};

export default SortableGrid;