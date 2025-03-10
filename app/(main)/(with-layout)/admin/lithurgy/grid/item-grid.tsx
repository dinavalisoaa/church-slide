import React, { forwardRef, HTMLAttributes, CSSProperties } from 'react';

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
    id: string;
    content?: string;
    imageUrl?: string;
    withOpacity?: boolean;
    isDragging?: boolean;
    onRemove?: (id: string) => void;
};

const ItemGrid = forwardRef<HTMLDivElement, ItemProps>(
    ({ id, content, imageUrl, withOpacity, isDragging, onRemove, style, ...props }, ref) => {
        const inlineStyles: CSSProperties = {
            opacity: withOpacity ? '0.5' : '1',
            transformOrigin: '50% 50%',
            height: '200px',
            width: '140px',
            borderRadius: '10px',
            cursor: isDragging ? 'grabbing' : 'grab',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: isDragging
                ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px'
                : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
            transform: !isDragging ? 'scale(1.05)' : 'scale(1)',
            padding: '10px',
            ...style,
        };

        return (
            <div ref={ref} style={inlineStyles} {...props}>
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={content || `Item ${id}`}
                        style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '5px',
                        }}
                    />
                )}
                <h1>{content || 'No Contssent'}</h1>
                {onRemove && (
                    <button
                        onClick={() => onRemove(id)}
                        style={{
                            background: '#ff4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '5px 10px',
                            cursor: 'pointer',
                            fontSize: '12px',
                        }}
                    >
                        Remove
                    </button>
                )}
            </div>
        );
    }
);


export default ItemGrid;