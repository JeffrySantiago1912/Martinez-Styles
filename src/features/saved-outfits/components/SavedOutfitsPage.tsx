import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store/useStore';
import Button from '../../../shared/components/Button';
import type { Outfit, OutfitItem } from '../../../shared/types';

const SavedOutfitsPage = () => {
    const navigate = useNavigate();
    const { savedOutfits, deleteOutfit, loadOutfit, addToCart } = useStore();

    const handleLoadOutfit = (outfitId: string) => {
        loadOutfit(outfitId);
        navigate('/builder');
    };

    const handleAddToCart = (outfit: Outfit) => {
        addToCart(outfit, 'outfit');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="font-display font-bold text-4xl text-primary-900 mb-2">
                    Mis Outfits Guardados
                </h1>
                <p className="text-primary-600">
                    Tus combinaciones favoritas listas para usar
                </p>
            </motion.div>

            {/* Outfits Grid */}
            {savedOutfits.length === 0 ? (
                <div className="text-center py-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md mx-auto"
                    >
                        <div className="text-6xl mb-4">👔</div>
                        <h2 className="font-display font-semibold text-2xl text-primary-900 mb-2">
                            No tienes outfits guardados
                        </h2>
                        <p className="text-primary-600 mb-6">
                            Crea tu primera combinación en el Outfit Builder
                        </p>
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => navigate('/builder')}
                        >
                            Crear Outfit
                        </Button>
                    </motion.div>
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
                    {savedOutfits.map((outfit) => (
                        <OutfitCard
                            key={outfit.id}
                            outfit={outfit}
                            onLoad={() => handleLoadOutfit(outfit.id)}
                            onDelete={() => deleteOutfit(outfit.id)}
                            onAddToCart={() => handleAddToCart(outfit)}
                        />
                    ))}
                </motion.div>
            )}
        </div>
    );
};

interface OutfitCardProps {
    outfit: Outfit;
    onLoad: () => void;
    onDelete: () => void;
    onAddToCart: () => void;
}

const OutfitCard = ({ outfit, onLoad, onDelete, onAddToCart }: OutfitCardProps) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -8 }}
            className="card overflow-hidden group"
        >
            {/* Preview */}
            <div className="relative aspect-square bg-primary-50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="grid grid-cols-2 gap-2">
                        {outfit.items.slice(0, 4).map((item: OutfitItem) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg p-2 shadow-sm"
                            >
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-display font-semibold text-lg text-primary-900 mb-1">
                    {outfit.name}
                </h3>
                <p className="text-sm text-primary-600 mb-2">
                    {outfit.items.length} prendas
                </p>
                <p className="text-2xl font-bold text-primary-900 mb-4">
                    ${outfit.totalPrice.toFixed(2)}
                </p>

                {/* Actions */}
                <div className="space-y-2">
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={onLoad}
                        className="w-full"
                    >
                        Editar en Builder
                    </Button>
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={onAddToCart}
                            className="flex-1"
                        >
                            🛍️ Carrito
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={onDelete}
                            className="flex-1"
                        >
                            🗑️ Eliminar
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SavedOutfitsPage;
