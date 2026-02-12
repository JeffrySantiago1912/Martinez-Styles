import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useStore } from '../../../store/useStore';
import ProductCard from './ProductCard';
import FilterPanel from './FilterPanel';
import Skeleton from '../../../shared/components/Skeleton';

const CatalogPage = () => {
    const navigate = useNavigate();
    const { filteredProducts, isLoading, error, filterProducts } = useProducts();
    const { addToOutfit, addToCart } = useStore();

    const handleAddToOutfit = (product: any) => {
        addToOutfit(product, { x: 100, y: 100 });
        navigate('/builder');
    };

    const handleAddToCart = (product: any) => {
        addToCart(product, 'product');
    };

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-lg mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-primary-900 underline"
                    >
                        Intentar de nuevo
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="font-display font-bold text-4xl text-primary-900 mb-2">
                    Catálogo de Prendas
                </h1>
                <p className="text-primary-600">
                    Explora nuestra colección y crea combinaciones únicas
                </p>
            </motion.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters - Desktop */}
                <div className="hidden lg:block">
                    <FilterPanel onFilterChange={filterProducts} />
                </div>

                {/* Products Grid */}
                <div className="lg:col-span-3">
                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden mb-6">
                        <button className="w-full px-4 py-3 bg-white rounded-lg shadow-soft flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            <span className="font-medium">Filtros</span>
                        </button>
                    </div>

                    {/* Products Count */}
                    <div className="mb-6 text-sm text-primary-600">
                        {isLoading ? 'Cargando...' : `${filteredProducts.length} productos encontrados`}
                    </div>

                    {/* Products Grid */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} variant="card" />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1,
                                    },
                                },
                            }}
                            initial="hidden"
                            animate="show"
                        >
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToOutfit={handleAddToOutfit}
                                    onAddToCart={handleAddToCart}
                                />
                            ))}
                        </motion.div>
                    )}

                    {/* Empty State */}
                    {!isLoading && filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-primary-600 text-lg">
                                No se encontraron productos con los filtros seleccionados
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;
