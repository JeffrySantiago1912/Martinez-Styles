import { motion } from 'framer-motion';
import type { Product } from '../../../shared/types';
import Button from '../../../shared/components/Button';

interface ProductCardProps {
    product: Product;
    onAddToOutfit?: (product: Product) => void;
    onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToOutfit, onAddToCart }: ProductCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            className="card overflow-hidden group cursor-pointer"
        >
            {/* Image */}
            <div className="relative aspect-square bg-primary-100 dark:bg-primary-800 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Quick actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        className="p-2 bg-white dark:bg-primary-800 rounded-full shadow-lg hover:bg-accent-500 dark:hover:bg-accent-600 transition-colors"
                        aria-label="Add to favorites"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Category badge */}
                <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 rounded-full mb-2">
                    {product.category}
                </span>

                {/* Name */}
                <h3 className="font-display font-semibold text-lg text-primary-900 dark:text-primary-100 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {product.name}
                </h3>

                {/* Price */}
                <p className="text-2xl font-bold text-primary-900 dark:text-accent-400 mb-4">
                    ${product.price.toFixed(2)}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                    {onAddToOutfit && (
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onAddToOutfit(product)}
                            className="flex-1"
                        >
                            Agregar a Outfit
                        </Button>
                    )}
                    {onAddToCart && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onAddToCart(product)}
                            className="flex-1"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
