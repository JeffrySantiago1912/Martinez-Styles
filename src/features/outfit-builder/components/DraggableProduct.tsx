import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import type { Product } from '../../../shared/types';

interface DraggableProductProps {
    product: Product;
}

const DraggableProduct = ({ product }: DraggableProductProps) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: product.id,
    });

    return (
        <motion.div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            whileHover={{ scale: 1.02 }}
            className={`bg-primary-50 rounded-lg p-3 cursor-grab active:cursor-grabbing transition-all ${isDragging ? 'opacity-50' : 'opacity-100'
                }`}
        >
            <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white rounded-lg flex-shrink-0 overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-1"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-primary-900 truncate">
                        {product.name}
                    </h3>
                    <p className="text-xs text-primary-600 truncate">{product.category}</p>
                    <p className="text-sm font-bold text-primary-900 mt-1">
                        ${product.price.toFixed(2)}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default DraggableProduct;
