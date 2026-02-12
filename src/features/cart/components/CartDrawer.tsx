import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../../store/useStore';
import Button from '../../../shared/components/Button';

const CartDrawer = () => {
    const { cart, ui, setUIState, removeFromCart, updateCartQuantity, clearCart } = useStore();

    const isOpen = ui.isCartOpen;

    const totalPrice = cart.reduce((sum, item) => {
        if (item.type === 'product') {
            return sum + (item.data as any).price * item.quantity;
        } else {
            return sum + (item.data as any).totalPrice * item.quantity;
        }
    }, 0);

    const handleClose = () => {
        setUIState({ isCartOpen: false });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white dark:bg-primary-900 shadow-soft-lg z-50 flex flex-col border-l border-primary-100 dark:border-primary-700"
                    >
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-primary-200 dark:border-primary-700 flex items-center justify-between">
                            <h2 className="font-display font-semibold text-xl text-primary-900 dark:text-primary-100">
                                Carrito de Compras
                            </h2>
                            <button
                                onClick={handleClose}
                                className="text-primary-500 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-100 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            {cart.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-4xl mb-3">🛒</div>
                                    <p className="text-primary-600 dark:text-primary-400">Tu carrito está vacío</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <CartItemCard
                                            key={item.id}
                                            item={item}
                                            onRemove={() => removeFromCart(item.id)}
                                            onUpdateQuantity={(qty) => updateCartQuantity(item.id, qty)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="border-t border-primary-200 dark:border-primary-700 px-6 py-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-display font-semibold text-primary-900 dark:text-primary-100">Total:</span>
                                    <span className="text-2xl font-bold text-primary-900 dark:text-accent-400">
                                        ${totalPrice.toFixed(2)}
                                    </span>
                                </div>

                                <Button variant="secondary" size="lg" className="w-full">
                                    Proceder al Pago
                                </Button>

                                <button
                                    onClick={clearCart}
                                    className="w-full text-sm text-primary-600 dark:text-primary-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                >
                                    Vaciar Carrito
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

interface CartItemCardProps {
    item: any;
    onRemove: () => void;
    onUpdateQuantity: (quantity: number) => void;
}

const CartItemCard = ({ item, onRemove, onUpdateQuantity }: CartItemCardProps) => {
    const isProduct = item.type === 'product';
    const data = item.data;

    return (
        <div className="bg-primary-50 dark:bg-primary-800/50 rounded-lg p-3 border border-transparent dark:border-primary-700/50">
            <div className="flex gap-3">
                {/* Image */}
                <div className="w-20 h-20 bg-white dark:bg-primary-700 rounded-lg flex-shrink-0 overflow-hidden">
                    {isProduct ? (
                        <img
                            src={data.image}
                            alt={data.name}
                            className="w-full h-full object-contain p-1"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                            👔
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-primary-900 dark:text-primary-100 truncate">
                        {isProduct ? data.name : data.name}
                    </h3>
                    <p className="text-xs text-primary-600 dark:text-primary-400">
                        {isProduct ? data.category : `${data.items.length} prendas`}
                    </p>
                    <p className="text-lg font-bold text-primary-900 dark:text-primary-100 mt-1">
                        ${(isProduct ? data.price : data.totalPrice).toFixed(2)}
                    </p>
                </div>

                {/* Remove */}
                <button
                    onClick={onRemove}
                    className="text-primary-500 dark:text-primary-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 mt-3">
                <button
                    onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
                    className="w-8 h-8 bg-white dark:bg-primary-700 rounded-lg flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-600 transition-colors text-primary-900 dark:text-primary-100"
                >
                    −
                </button>
                <span className="flex-1 text-center font-medium text-primary-900 dark:text-primary-100">{item.quantity}</span>
                <button
                    onClick={() => onUpdateQuantity(item.quantity + 1)}
                    className="w-8 h-8 bg-white dark:bg-primary-700 rounded-lg flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-600 transition-colors text-primary-900 dark:text-primary-100"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default CartDrawer;
