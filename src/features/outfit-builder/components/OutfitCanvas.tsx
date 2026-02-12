import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { useStore } from '../../../store/useStore';
import type { OutfitItem } from '../../../shared/types';
import Mannequin from './Mannequin';

const OutfitCanvas = () => {
    const { isOver, setNodeRef } = useDroppable({
        id: 'canvas',
    });

    const { currentOutfit, removeFromOutfit, updateItemPosition } = useStore();
    const [showMannequin, setShowMannequin] = useState(false);
    const [gender, setGender] = useState<'male' | 'female'>('female');

    return (
        <div
            ref={setNodeRef}
            id="outfit-canvas"
            className={`relative bg-white rounded-xl shadow-soft overflow-hidden transition-all ${isOver ? 'ring-4 ring-accent-500 bg-accent-50' : ''
                }`}
            style={{ minHeight: '600px', height: 'calc(100vh - 250px)' }}
        >
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Mannequin Layer */}
            <AnimatePresence>
                {showMannequin && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        <Mannequin gender={gender} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute top-4 right-4 z-10 flex gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-sm border border-primary-200">
                <button
                    onClick={() => setShowMannequin(!showMannequin)}
                    className={`p-2 rounded-md transition-colors ${showMannequin ? 'bg-accent-100 text-accent-700' : 'hover:bg-primary-100 text-primary-600'}`}
                    title="Toggle Mannequin"
                >
                    {showMannequin ? '👁️' : '🕶️'}
                </button>
                {showMannequin && (
                    <button
                        onClick={() => setGender(gender === 'female' ? 'male' : 'female')}
                        className="p-2 rounded-md hover:bg-primary-100 text-primary-600 transition-colors"
                        title="Switch Gender"
                    >
                        {gender === 'female' ? '👩' : '👨'}
                    </button>
                )}
            </div>

            {/* Drop Zone Hint */}
            {currentOutfit.length === 0 && !showMannequin && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-6xl mb-4"
                        >
                            👕
                        </motion.div>
                        <p className="text-primary-400 text-lg font-medium">
                            Arrastra prendas aquí para crear tu outfit
                        </p>
                    </div>
                </div>
            )}

            {/* Outfit Items */}
            <AnimatePresence>
                {currentOutfit.map((item) => (
                    <CanvasItem
                        key={item.id}
                        item={item}
                        onRemove={() => removeFromOutfit(item.id)}
                        onPositionChange={(position) => updateItemPosition(item.id, position)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

interface CanvasItemProps {
    item: OutfitItem;
    onRemove: () => void;
    onPositionChange: (position: { x: number; y: number }) => void;
}

const CanvasItem = ({ item, onRemove, onPositionChange }: CanvasItemProps) => {
    const dragControls = useDragControls();

    return (
        <motion.div
            drag
            dragControls={dragControls}
            dragMomentum={false}
            dragElastic={0.1}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onDragEnd={(_, info) => {
                onPositionChange({
                    x: item.position.x + info.offset.x,
                    y: item.position.y + info.offset.y,
                });
            }}
            style={{
                position: 'absolute',
                left: item.position.x,
                top: item.position.y,
                zIndex: item.zIndex,
            }}
            className="group cursor-move"
        >
            <div className="relative bg-white rounded-lg shadow-soft-lg p-2 border-2 border-transparent hover:border-accent-500 transition-all">
                {/* Image */}
                <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-32 h-32 object-contain pointer-events-none"
                />

                {/* Remove Button */}
                <button
                    onClick={onRemove}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
                    aria-label="Remove item"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Price Tag */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary-900 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${item.product.price.toFixed(2)}
                </div>
            </div>
        </motion.div>
    );
};

export default OutfitCanvas;
