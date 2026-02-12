import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../../store/useStore';
import Button from '../../../shared/components/Button';
import Modal from '../../../shared/components/Modal';
import type { Outfit } from '../../../shared/types';

const OutfitSummary = () => {
    const { currentOutfit, clearCurrentOutfit, saveOutfit, addToCart, removeFromOutfit } = useStore();
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [outfitName, setOutfitName] = useState('');
    const { t } = useTranslation();

    const totalPrice = currentOutfit.reduce(
        (sum, item) => sum + item.product.price,
        0
    );

    const handleSaveOutfit = () => {
        if (outfitName.trim()) {
            saveOutfit(outfitName);
            setIsSaveModalOpen(false);
            setOutfitName('');
            clearCurrentOutfit();
        }
    };

    const handleAddToCart = () => {
        if (currentOutfit.length > 0) {
            const outfit: Outfit = {
                id: `temp-${Date.now()}`,
                name: 'Current Outfit',
                items: currentOutfit,
                totalPrice,
                createdAt: new Date(),
            };
            addToCart(outfit, 'outfit');
        }
    };

    const confirmDelete = (itemId: string) => {
        setItemToDelete(itemId);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (itemToDelete) {
            removeFromOutfit(itemToDelete);
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-primary-900/90 rounded-xl shadow-soft dark:shadow-lg p-6 sticky top-24 border border-primary-100 dark:border-primary-700"
            >
                <h2 className="font-display font-semibold text-xl mb-4 text-primary-900 dark:text-white">
                    {t('builder.summary.title')}
                </h2>

                {/* Items List */}
                <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto">
                    {currentOutfit.length === 0 ? (
                        <p className="text-primary-500 dark:text-primary-400 text-sm text-center py-8">
                            {t('builder.summary.empty')}
                        </p>
                    ) : (
                        currentOutfit.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-3 p-2 bg-primary-50 dark:bg-primary-800/50 rounded-lg group border border-transparent dark:border-primary-700/50"
                            >
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-12 h-12 object-contain bg-white dark:bg-primary-700 rounded"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-primary-900 dark:text-primary-100 truncate">
                                        {item.product.name}
                                    </p>
                                    <p className="text-xs text-primary-600 dark:text-primary-400">{item.product.category}</p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <p className="text-sm font-bold text-primary-900 dark:text-primary-100">
                                        ${item.product.price.toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => confirmDelete(item.id)}
                                        className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                                        title={t('builder.summary.deleteModal.title')}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Total Price */}
                <div className="border-t border-primary-200 dark:border-primary-700 pt-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-primary-600 dark:text-primary-700">{t('builder.summary.items')}</span>
                        <span className="font-medium text-primary-900 dark:text-white">{currentOutfit.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-display font-semibold text-primary-900 dark:text-white">{t('builder.summary.total')}</span>
                        <span className="text-2xl font-bold text-primary-900 dark:text-accent-400">
                            ${totalPrice.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <Button
                        variant="secondary"
                        size="md"
                        onClick={() => setIsSaveModalOpen(true)}
                        disabled={currentOutfit.length === 0}
                        className="w-full flex items-center justify-center gap-2 bg-primary-900 dark:bg-white text-white dark:text-primary-900 hover:bg-primary-800 dark:hover:bg-primary-100 border-none shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {t('builder.summary.save')}
                    </Button>

                    <Button
                        variant="secondary"
                        size="md"
                        onClick={handleAddToCart}
                        disabled={currentOutfit.length === 0}
                        className="w-full"
                    >
                        🛍️ {t('builder.summary.addToCart')}
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearCurrentOutfit}
                        disabled={currentOutfit.length === 0}
                        className="w-full text-primary-500 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-100"
                    >
                        {t('builder.summary.clear')}
                    </Button>
                </div>
            </motion.div>

            {/* Save Modal */}
            <Modal
                isOpen={isSaveModalOpen}
                onClose={() => setIsSaveModalOpen(false)}
                title={t('builder.summary.saveModal.title')}
                size="sm"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                            {t('builder.summary.saveModal.label')}
                        </label>
                        <input
                            type="text"
                            value={outfitName}
                            onChange={(e) => setOutfitName(e.target.value)}
                            placeholder={t('builder.summary.saveModal.placeholder')}
                            className="w-full px-4 py-2 border border-primary-300 dark:border-primary-600 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white dark:bg-primary-800 text-primary-900 dark:text-primary-100"
                            autoFocus
                        />
                    </div>

                    <div className="flex gap-3">
                        <Button
                            variant="ghost"
                            onClick={() => setIsSaveModalOpen(false)}
                            className="flex-1"
                        >
                            {t('builder.summary.saveModal.cancel')}
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleSaveOutfit}
                            disabled={!outfitName.trim()}
                            className="flex-1"
                        >
                            {t('builder.summary.saveModal.save')}
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title={t('builder.summary.deleteModal.title')}
                size="sm"
            >
                <div className="space-y-4">
                    <p className="text-primary-600 dark:text-primary-400">
                        {t('builder.summary.deleteModal.message')}
                    </p>
                    <div className="flex gap-3">
                        <Button
                            variant="ghost"
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="flex-1"
                        >
                            {t('builder.summary.deleteModal.cancel')}
                        </Button>
                        <Button
                            variant="primary" // Ideally danger variant but using primary for now
                            onClick={handleDelete}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                        >
                            {t('builder.summary.deleteModal.confirm')}
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default OutfitSummary;
