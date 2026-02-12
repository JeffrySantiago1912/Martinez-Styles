import { useState } from 'react';
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, TouchSensor } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../../store/useStore';
import { useProducts } from '../../catalog/hooks/useProducts';
import Skeleton from '../../../shared/components/Skeleton';
import type { Product } from '../../../shared/types';
import DraggableProduct from './DraggableProduct';
import OutfitCanvas from './OutfitCanvas';
import OutfitSummary from './OutfitSummary';

const OutfitBuilderPage = () => {
    const { products, isLoading } = useProducts();
    const { currentOutfit, addToOutfit } = useStore();
    const [activeProduct, setActiveProduct] = useState<Product | null>(null);
    const { t } = useTranslation();

    // Configure sensors for both mouse and touch
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 200,
                tolerance: 5,
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        const product = products.find((p) => p.id === String(event.active.id));
        if (product) {
            setActiveProduct(product);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && over.id === 'canvas') {
            const product = products.find((p) => p.id === String(active.id));
            if (product) {
                const x = event.delta.x;
                const y = event.delta.y;

                addToOutfit(product, { x, y });
            }
        }

        setActiveProduct(null);
    };

    const handleDragCancel = () => {
        setActiveProduct(null);
    };

    return (
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="font-display font-bold text-4xl text-primary-900 mb-2">
                    {t('builder.title')}
                </h1>
                <p className="text-primary-600">
                    {t('builder.subtitle')}
                </p>
            </motion.div>

            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Panel - Product Palette */}
                    <div className="lg:col-span-3 order-2 lg:order-1">
                        <div className="bg-white rounded-xl shadow-soft p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                            <h2 className="font-display font-semibold text-lg mb-4">
                                {t('builder.availableItems')}
                            </h2>

                            {isLoading ? (
                                <div className="space-y-4">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <Skeleton key={i} variant="card" className="h-32" />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {products.slice(0, 12).map((product) => (
                                        <DraggableProduct key={product.id} product={product} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Center - Canvas */}
                    <div className="lg:col-span-6 order-1 lg:order-2">
                        <OutfitCanvas />
                    </div>

                    {/* Right Panel - Summary */}
                    <div className="lg:col-span-3 order-3">
                        <OutfitSummary />
                    </div>
                </div>

                {/* Drag Overlay */}
                <DragOverlay>
                    {activeProduct ? (
                        <div className="bg-white rounded-lg shadow-soft-lg p-2 opacity-80">
                            <img
                                src={activeProduct.image}
                                alt={activeProduct.name}
                                className="w-24 h-24 object-contain"
                            />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
};

export default OutfitBuilderPage;
